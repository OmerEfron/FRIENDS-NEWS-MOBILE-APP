const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const { errorHandler } = require('./middleware/error');
const { setupLogger } = require('./utils/logger');
const FileDb = require('./utils/fileDb');

const authRoutes = require('./routes/auth.routes');
const userRoutes = require('./routes/user.routes');
const groupRoutes = require('./routes/group.routes');
const postRoutes = require('./routes/post.routes');
const mediaRoutes = require('./routes/media.routes');

const app = express();
const logger = setupLogger();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files
app.use('/uploads', express.static(path.join(__dirname, '../public/uploads')));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/groups', groupRoutes);
app.use('/api/posts', postRoutes);
app.use('/api/media', mediaRoutes);

// Error handling
app.use(errorHandler);

// Initialize FileDb
FileDb.initialize()
  .then(() => {
    logger.info('FileDb initialized successfully');
    
    // Start server
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
      logger.info(`Server is running on port ${PORT}`);
    });
  })
  .catch((error) => {
    logger.error('Failed to initialize FileDb:', error);
    process.exit(1);
  }); 