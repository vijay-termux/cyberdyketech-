# StuDyke - Social Learning Platform

A comprehensive social learning platform built with PHP, MySQL, HTML, CSS, and JavaScript. Designed for GoDaddy hosting compatibility.

## Features

### 🏠 Core Features
- **Home Feed**: Create and share posts (text, photos, polls) with like and comment functionality
- **LinkUp**: Connect with peers based on field of interest and build your network
- **Communities**: Join field-specific groups for focused discussions and resource sharing
- **Ripples**: Activity feed showing posts and interactions from your network

### 🎯 Career Guidance Hub
- **Q&A System**: Ask career-related questions and get answers from mentors and peers
- **Category-based Organization**: Engineering, Medical, Commerce, Arts & Design, Entrepreneurship
- **Expert Answers**: Mentors can provide professional guidance with verified badges

### 🎓 Mentorship System
- **Mentor Registration**: Professionals can register as mentors with expertise and rates
- **Session Booking**: Students can book mentorship sessions with preferred mentors
- **Availability Management**: Mentors can set their availability and hourly rates

### 🚀 Founders Section
- **Startup Showcase**: Founders can register their startups and share their journey
- **Pitch Deck Upload**: Upload and share pitch decks with the community
- **Funding Stage Tracking**: Track startups from idea to Series B+

### 💬 Discord-Style Messaging
- **Real-time Messaging**: One-on-one conversations with typing indicators
- **File Sharing**: Share images, documents, and educational videos
- **Media Preview**: In-line image viewing and video playback

### 💼 Jobs & Opportunities
- **Job Listings**: Browse internships and job opportunities by category
- **Personalized Recommendations**: Jobs tailored to your field of interest
- **Application Tracking**: Save and apply to relevant positions

### 👤 Profile Management
- **Comprehensive Profiles**: Bio, location, field of interest, and activity stats
- **Activity Tracking**: View your posts, questions, answers, and community participation
- **Profile Customization**: Upload profile pictures and update personal information

### ⭐ Premium System
- **Tiered Subscriptions**: Basic (Free), Premium ($9.99/month), Pro ($19.99/month)
- **Premium Features**: Priority mentorship, exclusive content, advanced analytics
- **Flexible Billing**: Monthly, quarterly, semi-annual, and annual options with discounts

## Technical Stack

### Backend
- **PHP 7.4+**: Server-side logic and API endpoints
- **MySQL**: Database with comprehensive schema for all features
- **PDO**: Secure database connections with prepared statements
- **Session Management**: User authentication and authorization

### Frontend
- **HTML5**: Semantic markup with accessibility features
- **CSS3**: Modern responsive design with CSS Grid and Flexbox
- **JavaScript (ES6+)**: Interactive features and AJAX functionality
- **Font Awesome**: Icon library for consistent UI elements

### Database Schema
- **Users**: User accounts with roles (student, mentor, founder, admin)
- **Posts**: Text, photo, and poll posts with engagement tracking
- **Questions/Answers**: Career guidance Q&A system
- **Communities**: Field-based groups with membership management
- **Messages**: Direct messaging with file attachments
- **Mentors/Bookings**: Mentorship system with session management
- **Founders/Pitchdecks**: Startup showcase with document uploads
- **Subscriptions**: Premium membership management

## Installation

### Requirements
- PHP 7.4 or higher
- MySQL 5.7 or higher
- Web server (Apache/Nginx)
- GoDaddy shared hosting compatible

### Setup Instructions

1. **Database Setup**
   \`\`\`bash
   # Import the database schema
   mysql -u username -p database_name < database/studyke_database.sql
   \`\`\`

2. **Configuration**
   \`\`\`php
   // Update config/database.php with your database credentials
   private $host = 'localhost';
   private $db_name = 'your_database_name';
   private $username = 'your_db_username';
   private $password = 'your_db_password';
   \`\`\`

3. **File Permissions**
   \`\`\`bash
   # Set write permissions for upload directories
   chmod 755 uploads/
   chmod 755 uploads/posts/
   chmod 755 uploads/messages/
   chmod 755 uploads/profiles/
   chmod 755 uploads/pitchdecks/
   \`\`\`

4. **Upload to Server**
   - Upload all files to your web server's public directory
   - Ensure all PHP files have proper permissions
   - Test the installation by accessing the login page

### Default Login
- **Email**: john@example.com
- **Password**: password (hashed in database)

## File Structure

\`\`\`
studyke-platform/
├── auth/
│   ├── login.php
│   ├── register.php
│   └── logout.php
├── config/
│   └── database.php
├── includes/
│   ├── header.php
│   └── footer.php
├── assets/
│   ├── css/
│   │   └── style.css
│   └── js/
│       └── main.js
├── api/
│   ├── toggle-like.php
│   ├── add-comment.php
│   └── toggle-follow.php
├── uploads/
│   ├── posts/
│   ├── messages/
│   ├── profiles/
│   └── pitchdecks/
├── database/
│   └── studyke_database.sql
├── index.php (Home Feed)
├── linkup.php
├── communities.php
├── ripples.php
├── career-guidance.php
├── mentorship.php
├── founders.php
├── messages.php
├── jobs.php
├── profile.php
├── premium.php
└── README.md
\`\`\`

## Features in Detail

### Authentication System
- Secure password hashing with PHP's `password_hash()`
- Session-based authentication
- Role-based access control
- Registration with email validation

### Post System
- **Text Posts**: Rich text with line break support
- **Photo Posts**: Image upload with preview and optimization
- **Poll Posts**: Multiple choice polls with real-time vote tracking
- **Engagement**: Like, comment, and share functionality

### Messaging System
- **Real-time Chat**: Discord-style interface with conversation history
- **File Sharing**: Support for images, videos, and documents
- **Media Preview**: In-line viewing of shared content
- **User Discovery**: Find and start conversations with community members

### Career Guidance
- **Categorized Q&A**: Questions organized by field of study
- **Expert Answers**: Verified mentors provide professional guidance
- **Community Voting**: Like system for helpful answers
- **Search & Filter**: Find relevant questions and answers

### Mentorship Platform
- **Mentor Profiles**: Detailed profiles with expertise and experience
- **Session Booking**: Calendar-based booking system
- **Rate Management**: Flexible pricing including free mentorship
- **Session Tracking**: History of completed and upcoming sessions

## Security Features

- **SQL Injection Protection**: All queries use prepared statements
- **XSS Prevention**: Input sanitization and output escaping
- **File Upload Security**: Type validation and secure file handling
- **Session Security**: Proper session management and timeout
- **Access Control**: Role-based permissions throughout the platform

## Mobile Responsiveness

- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile
- **Touch-Friendly**: Optimized for touch interactions
- **Mobile Navigation**: Collapsible sidebar for mobile devices
- **Adaptive Layouts**: CSS Grid and Flexbox for flexible layouts

## Browser Compatibility

- **Modern Browsers**: Chrome, Firefox, Safari, Edge
- **Progressive Enhancement**: Graceful degradation for older browsers
- **JavaScript Fallbacks**: Core functionality works without JavaScript

## Performance Optimizations

- **Efficient Queries**: Optimized database queries with proper indexing
- **Image Optimization**: Automatic image resizing and compression
- **Caching**: Browser caching for static assets
- **Lazy Loading**: Progressive loading of content and images

## Future Enhancements

- **Real-time Notifications**: WebSocket integration for live updates
- **Video Calling**: Integrated video calls for mentorship sessions
- **AI Moderation**: Automated content moderation for inappropriate content
- **Mobile App**: Native iOS and Android applications
- **Advanced Analytics**: Detailed user engagement and learning analytics

## Support

For technical support or questions about the platform:
- Check the documentation in this README
- Review the code comments for implementation details
- Test all features in a development environment before production deployment

## License

This project is designed for educational and demonstration purposes. Please ensure compliance with all applicable laws and regulations when deploying to production.
