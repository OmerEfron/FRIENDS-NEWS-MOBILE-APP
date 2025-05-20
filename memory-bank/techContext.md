# Technical Context

## Development Environment

### Prerequisites
- Node.js (v16+)
- npm or yarn
- Expo CLI
- iOS Simulator / Android Emulator
- Git

### Setup Instructions
1. Clone Repository
   ```bash
   git clone <repository-url>
   cd friends-news-mobile-app
   ```

2. Install Dependencies
   ```bash
   cd frontend
   npm install
   ```

3. Start Development Server
   ```bash
   npm start
   ```

## Technical Stack

### Core Technologies
1. React Native
   - Version: Latest stable
   - Framework: Expo
   - JavaScript (no TypeScript)

2. State Management
   - React Context API
   - AsyncStorage
   - Future: Redux consideration

3. Navigation
   - React Navigation v6
   - Stack Navigator
   - Bottom Tab Navigator

### UI Components
1. Design System
   - Tailwind-RN
   - Custom components
   - Vector icons
   - Custom hooks

2. Media Handling
   - Expo Image Picker
   - Image caching
   - Media optimization
   - File system management

### Development Tools
1. Code Quality
   - ESLint
   - Prettier
   - PropTypes
   - Git hooks

2. Testing
   - Jest
   - React Native Testing Library
   - E2E testing (future)

## Dependencies

### Production Dependencies
```json
{
  "@react-navigation/bottom-tabs": "^6.x",
  "@react-navigation/native": "^6.x",
  "@react-navigation/stack": "^6.x",
  "expo": "latest",
  "expo-image-picker": "latest",
  "react": "18.x",
  "react-native": "0.7x",
  "react-native-vector-icons": "latest",
  "@react-native-async-storage/async-storage": "latest",
  "tailwind-rn": "latest"
}
```

### Development Dependencies
```json
{
  "@babel/core": "^7.x",
  "eslint": "^8.x",
  "jest": "^29.x",
  "prettier": "^2.x"
}
```

## Technical Constraints

### Performance
1. Memory Management
   - Image optimization
   - Cache strategy
   - Memory leak prevention
   - Background process handling

2. Network
   - Offline support
   - Data synchronization
   - API request batching
   - Cache invalidation

### Security
1. Data Storage
   - Secure storage for sensitive data
   - Data encryption
   - Session management
   - Token handling

2. API Security
   - Authentication
   - Authorization
   - Input validation
   - Rate limiting

### Platform Specific
1. iOS
   - App Store guidelines
   - iOS permissions
   - Device compatibility
   - iOS-specific features

2. Android
   - Play Store guidelines
   - Android permissions
   - Device fragmentation
   - Android-specific features

## Development Guidelines

### Code Style
1. File Structure
   ```
   ComponentName/
   ├── index.js
   ├── styles.js
   ├── utils.js
   └── __tests__/
   ```

2. Naming Conventions
   - PascalCase for components
   - camelCase for functions
   - UPPER_CASE for constants
   - kebab-case for files

### Best Practices
1. Performance
   - Use memo for expensive computations
   - Implement virtualized lists
   - Optimize re-renders
   - Lazy load components

2. Error Handling
   - Global error boundary
   - API error handling
   - Validation errors
   - User feedback

### Documentation
1. Code Documentation
   - JSDoc comments
   - Component props
   - Function documentation
   - Type definitions

2. Project Documentation
   - README
   - API documentation
   - Setup guide
   - Contributing guide

## Deployment

### Development
1. Local Development
   - Expo development build
   - Hot reloading
   - Debug tools
   - Device testing

2. Testing Environment
   - Staging servers
   - Test data
   - CI/CD integration
   - QA process

### Production
1. Build Process
   - App bundling
   - Asset optimization
   - Version management
   - Release notes

2. Distribution
   - App Store submission
   - Play Store submission
   - Beta testing
   - Release management

## Backend Technology Stack

### Core Technologies
- Node.js
- Express.js (^4.21.2)
- File-based JSON Storage
- Winston Logger (^3.17.0)

### Development Tools
- ESLint (^8.57.1)
- Prettier (^3.5.3)
- Nodemon (^3.1.10)
- Jest (^29.7.0)
- Supertest (^6.3.3)

### Key Dependencies
```json
{
  "dependencies": {
    "express": "^4.21.2",
    "cors": "^2.8.5",
    "joi": "^17.13.3",
    "winston": "^3.17.0",
    "dotenv": "^16.5.0",
    "bcrypt": "^6.0.0",
    "bcryptjs": "^2.4.3",
    "jsonwebtoken": "^9.0.2",
    "multer": "^1.4.5-lts.1",
    "cloudinary": "^1.41.1",
    "express-validator": "^7.0.1"
  },
  "devDependencies": {
    "nodemon": "^3.1.10",
    "eslint": "^8.57.1",
    "prettier": "^3.5.3",
    "jest": "^29.7.0",
    "supertest": "^6.3.3"
  }
}
```

## Implementation Details

### 1. Storage System
- JSON files for data persistence (verified working)
- Atomic file operations (implemented)
- Upload directories created
- Backup system (planned)

### 2. API Structure
- RESTful endpoints (tested)
- JSON request/response format (verified)
- Standardized error handling (implemented)
- Input validation (working)
- Rate limiting (planned)

### 3. Security Implementation
- Password hashing with bcrypt (ready)
- JWT authentication (dependencies installed)
- Request validation with express-validator
- Error masking (implemented)
- CORS configuration (tested)

### 4. File Upload System (Ready to Implement)
- Multer for file handling (installed)
- Cloudinary for image storage (installed)
- Organized upload directories (created)
- File type validation (planned)
- Size limits (planned)

## Development Setup

### Environment Variables
```env
PORT=3001
NODE_ENV=development
LOG_LEVEL=debug
UPLOAD_DIR=public/uploads
```

### Directory Structure (Verified)
```
backend/
├── src/
│   ├── config/        # Configuration files
│   ├── controllers/   # Request handlers
│   ├── data/         # JSON storage files
│   ├── middleware/   # Express middleware
│   ├── models/       # Data models and types
│   ├── routes/       # API route definitions
│   ├── services/     # Business logic
│   └── utils/        # Shared utilities
├── public/
│   └── uploads/      # User uploaded content
│       ├── images/   # Original images
│       └── thumbnails/ # Processed thumbnails
└── tests/           # Test files
```

### File Naming Conventions (In Use)
- Controllers: `*.controller.js`
- Routes: `*.routes.js`
- Middleware: `*.middleware.js`
- Utils: `*.util.js`
- Tests: `*.test.js`

## API Documentation

### Group Endpoints (Verified Working)
```
GET    /api/groups         # List all groups
GET    /api/groups/:id     # Get single group
POST   /api/groups         # Create group
PUT    /api/groups/:id     # Update group
DELETE /api/groups/:id     # Delete group
POST   /api/groups/:id/members # Update member count
```

### User Endpoints (Implemented)
```
GET    /api/users          # List all users
GET    /api/users/:id      # Get user profile
PUT    /api/users/:id      # Update user
GET    /api/users/:id/groups # Get user's groups
POST   /api/users/:id/groups/join  # Join group
POST   /api/users/:id/groups/leave # Leave group
```

### Auth Endpoints (Structure Ready)
```
POST   /api/auth/register  # Register new user
POST   /api/auth/login     # User login
GET    /api/auth/me        # Get current user
```

### Media Endpoints (Placeholder)
```
POST   /api/media/upload   # Upload media file
```

## Testing Strategy (Ready to Implement)

### Unit Testing
- Jest configured
- Controller tests (planned)
- Utility tests (planned)
- Validation tests (planned)

### Integration Testing
- Supertest installed
- API endpoint tests (planned)
- Auth flow tests (planned)
- File upload tests (planned)

### Test Data
- Mock data generation (planned)
- Test fixtures (planned)
- Database seeding (planned)
- Cleanup procedures (planned)

## Deployment Considerations

### Production Setup (Planned)
- PM2 process manager
- Nginx reverse proxy
- SSL configuration
- Regular backups

### Monitoring (Ready)
- Winston logging (configured)
- Error tracking (implemented)
- Performance monitoring (planned)
- Usage analytics (planned)

### Security Measures (In Progress)
- Rate limiting (planned)
- Request validation (implemented)
- Error masking (implemented)
- CORS configuration (tested)
- Security headers (planned) 