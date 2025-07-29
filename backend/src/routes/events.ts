import { Router } from 'express';
import { getEventsByCategory, getEducationEvents, getEventDetailsById } from '../services/ticketmaster';
import db from '../config/database';
import { sendEventRegistrationEmail } from '../services/emailService';

const router = Router();

router.get('/', async (req, res) => {
  try {
    const category = req.query.category as string || 'education';
    const events = await getEventsByCategory(category);
    res.json(events);
  } catch (error: any) {
    console.error('Error fetching events from Ticketmaster:', error.message);
    res.status(500).json({ error: error.message || 'Failed to fetch events from Ticketmaster' });
  }
});

// New route for event details by ID
router.get('/:id', async (req, res) => {
  try {
    const eventId = req.params.id;
    const eventDetails = await getEventDetailsById(eventId);
    res.json(eventDetails);
  } catch (error: any) {
    console.error('Error fetching event details from Ticketmaster:', error.message);
    res.status(500).json({ error: error.message || 'Failed to fetch event details from Ticketmaster' });
  }
});

// Event registration endpoint
router.post('/register', async (req, res) => {
  try {
    const { event_id, user_id } = req.body;
    if (!event_id || !user_id) {
      return res.status(400).json({ error: 'Missing event_id or user_id' });
    }
    // Convert to MySQL-compatible format (YYYY-MM-DD HH:MM:SS)
    const now = new Date();
    const registrationDate = now.toISOString().slice(0, 19).replace('T', ' ');
    const status = 'confirmed';
    await db.query(
      'INSERT INTO event_registration (user_id, event_id, registration_date, status) VALUES (?, ?, ?, ?)',
      [user_id, event_id, registrationDate, status]
    );
    
    // Get user details and event details for email
    const [userRows]: any = await db.query('SELECT * FROM users WHERE id = ?', [user_id]);
    const user = userRows[0];
    
    // Get event details from Ticketmaster
    const eventDetails = await getEventDetailsById(event_id);
    
    // Send confirmation email
    if (user && eventDetails) {
      // Map event details to match the Event interface
      const eventForEmail = {
        id: eventDetails.id,
        title: eventDetails.title,
        date: eventDetails.date,
        time: eventDetails.time,
        location: eventDetails.venue || 'Location TBD'
      };
      await sendEventRegistrationEmail(user, eventForEmail);
    }
    
    res.json({ success: true });
  } catch (error: any) {
    console.error('Error registering for event:', error.message);
    res.status(500).json({ error: error.message || 'Failed to register for event' });
  }
});

export default router; 