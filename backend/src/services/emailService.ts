import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

// Debug email configuration
console.log('Email configuration:');
console.log('EMAIL_USER:', process.env.EMAIL_USER ? 'Set' : 'Not set');
console.log('EMAIL_PASS:', process.env.EMAIL_PASS ? 'Set' : 'Not set');

// Create transporter using the exact format you specified
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// Verify transporter configuration
transporter.verify(function(error, success) {
  if (error) {
    console.log('Email transporter error:', error);
  } else {
    console.log('Email server is ready to send messages');
  }
});

interface User {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
}

interface Event {
  id: string;
  title: string;
  date: string;
  time: string;
  location: string;
}

export const sendWelcomeEmail = async (user: User) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: user.email,
    subject: 'Welcome to EventFlow! 🎉',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; border-radius: 10px; text-align: center;">
          <h1 style="margin: 0; font-size: 28px;">Welcome to EventFlow!</h1>
          <p style="margin: 10px 0 0 0; font-size: 16px; opacity: 0.9;">Hi ${user.first_name}, we're excited to have you on board!</p>
        </div>
        
        <div style="padding: 30px; background: #f8f9fa; border-radius: 0 0 10px 10px;">
          <h2 style="color: #333; margin-bottom: 20px;">Getting Started</h2>
          
          <div style="margin-bottom: 25px;">
            <h3 style="color: #667eea; margin-bottom: 10px;">🎯 Quick Links</h3>
            <ul style="list-style: none; padding: 0;">
              <li style="margin-bottom: 10px;">
                <a href="${process.env.FRONTEND_URL || 'http://localhost:8080'}" style="color: #667eea; text-decoration: none; font-weight: bold;">
                  📅 Browse Events
                </a>
              </li>
              <li style="margin-bottom: 10px;">
                <a href="${process.env.FRONTEND_URL || 'http://localhost:8080'}/my-events" style="color: #667eea; text-decoration: none; font-weight: bold;">
                  👤 My Events
                </a>
              </li>
              <li style="margin-bottom: 10px;">
                <a href="${process.env.FRONTEND_URL || 'http://localhost:8080'}/login" style="color: #667eea; text-decoration: none; font-weight: bold;">
                  🔐 Sign In
                </a>
              </li>
            </ul>
          </div>
          
          <div style="margin-bottom: 25px;">
            <h3 style="color: #667eea; margin-bottom: 10px;">🚀 What You Can Do</h3>
            <ul style="color: #555; line-height: 1.6;">
              <li>Discover exciting school events across various categories</li>
              <li>Register for events with just one click</li>
              <li>Track your registered events in your personal dashboard</li>
              <li>Get notifications about upcoming events</li>
            </ul>
          </div>
          
          <div style="text-align: center; margin-top: 30px;">
            <p style="color: #666; font-size: 14px;">
              If you have any questions, feel free to reach out to our support team.
            </p>
          </div>
        </div>
        
        <div style="text-align: center; margin-top: 20px; color: #999; font-size: 12px;">
          <p>© 2024 EventFlow. All rights reserved.</p>
        </div>
      </div>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('Welcome email sent successfully to:', user.email);
  } catch (error) {
    console.error('Error sending welcome email:', error);
  }
};

export const sendEventRegistrationEmail = async (user: User, event: Event) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: user.email,
    subject: `Event Registration Confirmation - ${event.title}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; border-radius: 10px; text-align: center;">
          <h1 style="margin: 0; font-size: 28px;">Registration Confirmed! ✅</h1>
          <p style="margin: 10px 0 0 0; font-size: 16px; opacity: 0.9;">Hi ${user.first_name}, your event registration has been confirmed.</p>
        </div>
        
        <div style="padding: 30px; background: #f8f9fa; border-radius: 0 0 10px 10px;">
          <h2 style="color: #333; margin-bottom: 20px;">Event Details</h2>
          
          <div style="background: white; padding: 20px; border-radius: 8px; margin-bottom: 20px; border-left: 4px solid #667eea;">
            <h3 style="color: #667eea; margin: 0 0 15px 0; font-size: 20px;">${event.title}</h3>
            
            <div style="margin-bottom: 10px;">
              <strong style="color: #555;">📅 Date:</strong> ${event.date}
            </div>
            
            <div style="margin-bottom: 10px;">
              <strong style="color: #555;">🕒 Time:</strong> ${event.time}
            </div>
            
            <div style="margin-bottom: 15px;">
              <strong style="color: #555;">📍 Location:</strong> ${event.location}
            </div>
            
            <div style="text-align: center; margin-top: 20px;">
              <a href="${process.env.FRONTEND_URL || 'http://localhost:8080'}/events/${event.id}" 
                 style="background: #667eea; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: bold;">
                View Event Details
              </a>
            </div>
          </div>
          
          <div style="background: #e8f4fd; padding: 15px; border-radius: 6px; margin-bottom: 20px;">
            <h4 style="color: #2c5aa0; margin: 0 0 10px 0;">📋 What's Next?</h4>
            <ul style="color: #2c5aa0; margin: 0; padding-left: 20px;">
              <li>Save the event details to your calendar</li>
              <li>Check the event location and plan your route</li>
              <li>Look out for any additional information from the event organizers</li>
            </ul>
          </div>
          
          <div style="text-align: center; margin-top: 30px;">
            <p style="color: #666; font-size: 14px;">
              Thank you for registering! We look forward to seeing you at the event.
            </p>
          </div>
        </div>
        
        <div style="text-align: center; margin-top: 20px; color: #999; font-size: 12px;">
          <p>© 2024 EventFlow. All rights reserved.</p>
        </div>
      </div>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('Event registration email sent successfully to:', user.email);
  } catch (error) {
    console.error('Error sending event registration email:', error);
  }
}; 