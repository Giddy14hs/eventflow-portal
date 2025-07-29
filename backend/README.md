# EventFlow Backend

## Email Setup

To enable email functionality, you need to configure the following environment variables:

### Outlook/Hotmail Setup (Recommended)

1. **Create a free Outlook account** at https://outlook.live.com/
2. **Use your regular Outlook password** (no App Password needed)
3. **Add to your `.env` file**:
   ```
   EMAIL_USER=your-email@outlook.com
   EMAIL_PASSWORD=your-outlook-password
   FRONTEND_URL=http://localhost:8080
   ```

### Environment Variables

Create a `.env` file in the backend directory with:

```env
# Database Configuration
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your-db-password
DB_NAME=eventflow_db
DB_PORT=3306

# JWT Configuration
JWT_SECRET=your-secret-key-here

# Email Configuration (Outlook/Hotmail)
EMAIL_USER=your-email@outlook.com
EMAIL_PASSWORD=your-outlook-password

# Frontend URL
FRONTEND_URL=http://localhost:8080

# Ticketmaster API
TICKETMASTER_API_KEY=your-ticketmaster-api-key

# Server Configuration
PORT=4000
```

## Email Features

- **Welcome Email**: Sent to new users upon registration
- **Event Registration Confirmation**: Sent when users register for events

## Installation

1. Install dependencies:
   ```bash
   npm install
   ```

2. Set up your environment variables

3. Start the development server:
   ```bash
   npm run dev
   ```

## Why Outlook/Hotmail?

- **No 2FA required** - uses regular passwords
- **Reliable delivery** - good for production use
- **Free accounts** - easy to set up
- **Good security** - Microsoft's infrastructure 