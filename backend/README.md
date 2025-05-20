# Friendlines Backend

Backend server for the Friendlines social news platform.

## Setup

1. Install dependencies:
```bash
npm install
```

2. Create a `.env` file in the root directory and copy the contents from `.env.example`.
Update the values according to your environment.

3. Start the development server:
```bash
npm run dev
```

## API Endpoints

### Authentication
- POST `/api/auth/register` - Register a new user
- POST `/api/auth/login` - Login user
- GET `/api/auth/me` - Get current user profile

### Users
- GET `/api/users` - Get all users
- GET `/api/users/:id` - Get user by ID
- PUT `/api/users/:id` - Update user
- DELETE `/api/users/:id` - Delete user

### Groups
- GET `/api/groups` - Get all groups
- POST `/api/groups` - Create new group
- GET `/api/groups/:id` - Get group by ID
- PUT `/api/groups/:id` - Update group
- DELETE `/api/groups/:id` - Delete group

### Posts
- GET `/api/posts` - Get all posts
- POST `/api/posts` - Create new post
- GET `/api/posts/:id` - Get post by ID
- PUT `/api/posts/:id` - Update post
- DELETE `/api/posts/:id` - Delete post

### Media
- POST `/api/media/upload` - Upload media file
- DELETE `/api/media/:id` - Delete media file

## Project Structure

```
backend/
├── src/
│   ├── config/        # Configuration files
│   ├── models/        # Database models
│   ├── controllers/   # Route controllers
│   ├── middleware/    # Custom middleware
│   ├── routes/        # API routes
│   ├── services/      # Business logic
│   ├── utils/         # Utility functions
│   └── app.js         # App entry point
├── tests/            # Test files
└── logs/            # Application logs
```

## Scripts

- `npm start` - Start production server
- `npm run dev` - Start development server
- `npm test` - Run tests
- `npm run lint` - Run linter

## Dependencies

- Express.js - Web framework
- Mongoose - MongoDB ODM
- JWT - Authentication
- Bcrypt - Password hashing
- Multer - File upload
- Cloudinary - Media storage
- Winston - Logging
- Cors - Cross-origin resource sharing 