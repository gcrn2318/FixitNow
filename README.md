# FixItNow - Professional Home Services Platform

A modern, full-stack home services platform built with Next.js, featuring real-time chat, live tracking, and comprehensive service management.

## 🚀 Features

### Frontend
- **Modern UI**: Built with Next.js 15, React 19, and Tailwind CSS
- **Responsive Design**: Mobile-first approach with beautiful animations
- **Dark/Light Mode**: Full theme support
- **Role-based Access**: Separate dashboards for customers, providers, and admins

### Backend
- **Authentication**: JWT with refresh tokens
- **Database**: MongoDB with Mongoose ODM
- **Real-time Features**: Socket.io for chat and live tracking
- **RESTful APIs**: Comprehensive API endpoints
- **Data Validation**: Zod schema validation
- **File Upload**: Support for images and documents

### Core Functionality
- **User Management**: Customer and provider registration/profiles
- **Service Booking**: Complete booking lifecycle management
- **Real-time Chat**: Instant messaging between customers and providers
- **Live Tracking**: GPS tracking for service providers
- **Review System**: Rating and review system
- **Payment Integration**: Stripe payment processing (ready)
- **Admin Dashboard**: Analytics and user management

## 🛠 Tech Stack

### Frontend
- Next.js 15 (App Router)
- React 19
- TypeScript
- Tailwind CSS
- Radix UI Components
- Socket.io Client
- Zod Validation

### Backend
- Next.js API Routes
- MongoDB with Mongoose
- Socket.io Server
- JWT Authentication
- bcryptjs for password hashing
- Nodemailer for emails

## 📁 Project Structure

```
├── app/                    # Next.js App Router
│   ├── api/               # API Routes
│   │   ├── auth/          # Authentication endpoints
│   │   ├── bookings/      # Booking management
│   │   ├── messages/      # Chat functionality
│   │   ├── providers/     # Provider search
│   │   ├── reviews/       # Review system
│   │   ├── services/      # Service management
│   │   ├── tracking/      # Live tracking
│   │   └── admin/         # Admin endpoints
│   ├── customer/          # Customer pages
│   ├── provider/          # Provider pages
│   └── admin/             # Admin pages
├── lib/                   # Utilities and configurations
│   ├── models/            # Mongoose models
│   ├── mongodb.ts         # Database connection
│   ├── auth.ts            # Authentication utilities
│   ├── socket.ts          # Socket.io server
│   ├── api-client.ts      # Frontend API client
│   └── validations.ts     # Zod schemas
├── contexts/              # React contexts
├── components/            # Reusable components
└── pages/api/             # Socket.io API route
```

## 🗄 Database Models

### User Model
- Authentication and profile data
- Role-based fields (customer/provider/admin)
- Location and availability (providers)
- Statistics and earnings

### Booking Model
- Complete booking lifecycle
- Status tracking and updates
- Pricing and payment information
- Location and scheduling data

### Message Model
- Real-time chat messages
- File attachments support
- Read receipts and delivery status
- System messages for booking updates

### Review Model
- Rating and feedback system
- Category-based ratings
- Photo attachments
- Helpful votes

### Service Model
- Service catalog
- Pricing and duration information
- Category organization
- Popularity tracking

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- MongoDB (local or MongoDB Atlas)
- npm or pnpm

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd FixitNow-master
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   pnpm install
   ```

3. **Environment Setup**
   Create a `.env.local` file in the root directory:
   ```env
   # Database
   MONGODB_URI=mongodb://localhost:27017/fixitnow
   
   # JWT Secrets
   JWT_ACCESS_SECRET=your-super-secret-access-key
   JWT_REFRESH_SECRET=your-super-secret-refresh-key
   
   # App Configuration
   NEXT_PUBLIC_APP_URL=http://localhost:3000
   NEXT_PUBLIC_SOCKET_URL=http://localhost:3000
   ```

4. **Start MongoDB**
   Make sure MongoDB is running locally or update the connection string for MongoDB Atlas.

5. **Seed the Database (Development)**
   ```bash
   # The app will automatically seed data in development mode
   # Or manually trigger via API: POST /api/admin/seed
   ```

6. **Run the Development Server**
   ```bash
   npm run dev
   # or
   pnpm dev
   ```

7. **Open the Application**
   Navigate to `http://localhost:3000`

## 🧪 API Testing

### Test Accounts (After Seeding)
- **Admin**: admin@fixitnow.com / admin123
- **Customer**: customer1@example.com / password123
- **Provider**: provider1@example.com / password123

### Key API Endpoints

#### Authentication
- `POST /api/auth/login` - User login
- `POST /api/auth/register` - User registration
- `POST /api/auth/refresh` - Token refresh
- `POST /api/auth/logout` - User logout
- `GET /api/auth/me` - Get current user

#### Bookings
- `GET /api/bookings` - List bookings
- `POST /api/bookings` - Create booking
- `GET /api/bookings/[id]` - Get booking details
- `PUT /api/bookings/[id]` - Update booking

#### Messages
- `GET /api/messages` - Get messages
- `POST /api/messages` - Send message
- `GET /api/messages/conversations` - Get conversations

#### Providers
- `GET /api/providers/search` - Search providers

#### Admin
- `GET /api/admin/users` - List users
- `GET /api/admin/analytics` - Get analytics
- `POST /api/admin/seed` - Seed database (dev only)

## 🔌 Socket.io Events

### Client → Server
- `join-booking` - Join booking room
- `send-message` - Send real-time message
- `location-update` - Update provider location
- `typing-start/stop` - Typing indicators

### Server → Client
- `new-message` - Receive new message
- `provider-location` - Receive location update
- `booking-status-changed` - Booking status update
- `user-typing` - Typing indicators

## 🎯 Key Features Implementation

### Authentication Flow
1. User registers/logs in → JWT tokens generated
2. Access token (15min) + Refresh token (7d)
3. Automatic token refresh on expiry
4. Socket.io connection with token authentication

### Real-time Chat
1. Socket.io connection established on login
2. Messages stored in MongoDB
3. Real-time delivery with read receipts
4. File attachments and location sharing

### Live Tracking
1. Provider shares location via GPS
2. Real-time updates to customer
3. Route optimization and ETA calculation
4. Booking status updates

### Booking Lifecycle
1. Customer creates booking request
2. Provider confirms/declines
3. Real-time status updates
4. GPS tracking during service
5. Review and payment processing

## 🔧 Development

### Database Operations
```javascript
// Connect to database
import connectDB from '@/lib/mongodb'
await connectDB()

// Use models
import User from '@/lib/models/User'
const users = await User.find()
```

### API Client Usage
```javascript
import { apiClient } from '@/lib/api-client'

// Login
const response = await apiClient.login(email, password)

// Get bookings
const bookings = await apiClient.getBookings({ status: 'pending' })
```

### Socket.io Usage
```javascript
import { socketClient } from '@/lib/socket-client'

// Send message
socketClient.sendMessage({
  recipientId: 'user123',
  content: 'Hello!',
  bookingId: 'booking456'
})

// Listen for events
socketClient.on('new-message', (message) => {
  console.log('New message:', message)
})
```

## 🚀 Deployment

### Environment Variables
Update `.env.local` for production:
- Use MongoDB Atlas URI
- Set strong JWT secrets
- Configure email service
- Add Stripe keys for payments

### Build and Deploy
```bash
npm run build
npm start
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

For support and questions:
- Create an issue on GitHub
- Check the documentation
- Review API endpoints in `/app/api/`

---

Built with ❤️ using Next.js, MongoDB, and Socket.io