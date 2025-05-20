# System Patterns

## Architecture Overview

### Directory Structure
```
backend/
├── src/
│   ├── data/           # JSON data files
│   │   ├── groups.json
│   │   ├── posts.json
│   │   └── media.json
│   ├── models/         # Data models & file operations
│   ├── controllers/    # Route controllers
│   ├── middleware/     # Custom middleware
│   ├── routes/         # API routes
│   ├── services/       # Business logic
│   ├── utils/          # Utility functions
│   └── app.js         # App entry point
└── tests/            # Test files
```

### Data Storage Pattern

#### JSON File Structure
1. Groups Data (`data/groups.json`):
```json
{
  "groups": [
    {
      "id": "group-1",
      "name": "Close Friends",
      "description": "Inner circle updates",
      "avatar": "url/to/avatar",
      "memberCount": 8,
      "createdAt": "2024-03-15T10:00:00Z"
    }
  ]
}
```

2. Posts Data (`data/posts.json`):
```json
{
  "posts": [
    {
      "id": "post-1",
      "headline": "Breaking: Friend's Birthday Party",
      "subheadline": "Surprise celebration planned",
      "content": "Full story details...",
      "media": {
        "url": "url/to/media",
        "thumbnail": "url/to/thumbnail",
        "type": "image"
      },
      "groupId": "group-1",
      "isBreakingNews": true,
      "createdAt": "2024-03-15T12:00:00Z"
    }
  ]
}
```

### File Operations Pattern

#### Data Access Layer
```javascript
// models/fileDb.js
class FileDb {
  static async readData(filename) {
    // Read JSON file
  }
  
  static async writeData(filename, data) {
    // Write to JSON file
  }
  
  static async generateId(prefix) {
    // Generate unique ID
  }
}
```

#### Model Operations
```javascript
// models/group.model.js
class GroupModel {
  static async findAll() {
    const data = await FileDb.readData('groups.json');
    return data.groups;
  }
  
  static async findById(id) {
    const data = await FileDb.readData('groups.json');
    return data.groups.find(g => g.id === id);
  }
  
  static async create(groupData) {
    const data = await FileDb.readData('groups.json');
    const id = await FileDb.generateId('group');
    const newGroup = { id, ...groupData };
    data.groups.push(newGroup);
    await FileDb.writeData('groups.json', data);
    return newGroup;
  }
}
```

### Service Layer Pattern
```javascript
// services/group.service.js
class GroupService {
  static async getGroups() {
    return GroupModel.findAll();
  }
  
  static async createGroup(data) {
    // Validate data
    // Create group
    return GroupModel.create(data);
  }
}
```

### Controller Pattern
```javascript
// controllers/group.controller.js
const getGroups = async (req, res) => {
  try {
    const groups = await GroupService.getGroups();
    res.json({ status: 'success', data: groups });
  } catch (error) {
    next(error);
  }
};
```

### Media Handling
1. Local Storage
```javascript
// services/media.service.js
class MediaService {
  static async saveFile(file) {
    // Save to local uploads directory
    // Generate public URL
    // Return file metadata
  }
}
```

2. File Structure
```
backend/
└── public/
    └── uploads/
        ├── images/
        └── thumbnails/
```

### Error Handling
```javascript
// middleware/error.js
const errorHandler = (err, req, res, next) => {
  // Log error
  // Send appropriate response
};
```

## Implementation Guidelines

### Data Operations
1. File Reading
```javascript
const readJsonFile = async (filename) => {
  try {
    const data = await fs.readFile(filename);
    return JSON.parse(data);
  } catch (error) {
    if (error.code === 'ENOENT') {
      return { groups: [], posts: [] };
    }
    throw error;
  }
};
```

2. File Writing
```javascript
const writeJsonFile = async (filename, data) => {
  await fs.writeFile(
    filename,
    JSON.stringify(data, null, 2)
  );
};
```

3. ID Generation
```javascript
const generateId = (prefix) => {
  return `${prefix}-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
};
```

### Testing Strategy

#### Unit Tests
```javascript
describe('GroupModel', () => {
  beforeEach(() => {
    // Reset test data files
  });
  
  it('creates new group', async () => {
    // Test implementation
  });
});
```

#### Integration Tests
```javascript
describe('Group API', () => {
  it('returns list of groups', async () => {
    // Test implementation
  });
});
```

### API Response Format
```javascript
// Success response
{
  "status": "success",
  "data": {
    // Response data
  }
}

// Error response
{
  "status": "error",
  "message": "Error description"
}
``` 