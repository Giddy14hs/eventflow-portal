import axios from 'axios';

// Category to Ticketmaster classification mapping
const categoryMapping = {
  'academic': { keyword: 'academic', classificationName: 'Miscellaneous' },
  'sports': { keyword: 'sports', classificationName: 'Sports' },
  'social': { keyword: 'social', classificationName: 'Miscellaneous' },
  'arts': { keyword: 'arts', classificationName: 'Arts & Theatre' },
  'music': { keyword: 'music', classificationName: 'Music' },
  'theater': { keyword: 'theater', classificationName: 'Arts & Theatre' },
  'science': { keyword: 'science', classificationName: 'Miscellaneous' },
  'community': { keyword: 'community', classificationName: 'Miscellaneous' },
  'leadership': { keyword: 'leadership', classificationName: 'Miscellaneous' },
  'career': { keyword: 'career', classificationName: 'Miscellaneous' },
  'workshop': { keyword: 'workshop', classificationName: 'Miscellaneous' },
  'education': { keyword: 'school', classificationName: 'Miscellaneous' }
};

export async function getEventsByCategory(category: string = 'education') {
  const apiKey = process.env.TICKETMASTER_API_KEY || 'vB2gzXzFhGVrMhVloi3XXvxuN03fv8B2';
  console.log('Ticketmaster API Key:', apiKey); // DEBUG: Remove in production
  
  const mapping = categoryMapping[category as keyof typeof categoryMapping] || categoryMapping.education;
  const url = `https://app.ticketmaster.com/discovery/v2/events.json?apikey=${apiKey}&keyword=${mapping.keyword}&classificationName=${mapping.classificationName}`;

  const response = await axios.get(url);

  // Map Ticketmaster events to your app's format
  return (response.data._embedded?.events || []).map((event: any) => ({
    id: event.id,
    title: event.name || 'Untitled Event',
    description: event.pleaseNote || '',
    date: event.dates?.start?.localDate || '',
    time: event.dates?.start?.localTime || '',
    location: event._embedded?.venues?.[0]?.name || 'Location TBD',
    category: category,
    capacity: 0, // Ticketmaster doesn't provide capacity
    registered: 0, // Ticketmaster doesn't provide registration count
    url: event.url,
    image: event.images?.[0]?.url || '',
  }));
}

// Keep the original function for backward compatibility
export async function getEducationEvents() {
  return getEventsByCategory('education');
} 

export async function getEventDetailsById(eventId: string) {
  const apiKey = process.env.TICKETMASTER_API_KEY || 'vB2gzXzFhGVrMhVloi3XXvxuN03fv8B2';
  const url = `https://app.ticketmaster.com/discovery/v2/events/${eventId}.json?apikey=${apiKey}`;
  const response = await axios.get(url);
  const event = response.data;

  return {
    id: event.id,
    title: event.name || 'Untitled Event',
    description: event.info || event.pleaseNote || '',
    fullDescription: event.description || event.info || event.pleaseNote || '',
    date: event.dates?.start?.localDate || '',
    time: event.dates?.start?.localTime || '',
    venue: event._embedded?.venues?.[0]?.name || 'Venue TBD',
    venueDetails: event._embedded?.venues?.[0] || {},
    seatAvailability: event.seatmap ? 'Check on Ticketmaster' : 'Unknown',
    url: event.url,
    image: event.images?.[0]?.url || '',
  };
} 