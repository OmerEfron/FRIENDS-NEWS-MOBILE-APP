# System Architecture and Patterns

## Directory Structure
```
frontend/
├── src/
│   ├── components/
│   │   ├── common/      # Shared components
│   │   ├── feed/        # Feed-related components
│   │   ├── groups/      # Group-related components
│   │   └── posts/       # Post-related components
│   ├── screens/         # Main screen components
│   ├── navigation/      # Navigation configuration
│   ├── hooks/          # Custom React hooks
│   ├── utils/          # Utility functions
│   ├── constants/      # App constants
│   └── context/        # React Context providers
```

## Design Patterns

### Component Architecture
1. Atomic Design Methodology
   - Atoms (basic UI elements)
   - Molecules (component combinations)
   - Organisms (complex components)
   - Templates (screen layouts)
   - Pages (full screens)

2. Component Patterns
   - Presentational Components
   - Container Components
   - Higher-Order Components
   - Custom Hooks

### State Management
1. React Context
   - ThemeContext for app-wide theming
   - Future: AuthContext, DataContext

2. Local State
   - useState for component state
   - useReducer for complex state

### Navigation Pattern
1. Bottom Tab Navigation
   - Feed
   - Groups
   - Create
   - Profile

2. Stack Navigation
   - Groups List → Group Feed
   - Feed → Post Details
   - Future: Auth flows

## UI/UX Patterns

### Theme System
1. Colors
   - Primary: #0070f3
   - Secondary: #ef4444
   - Background (light/dark)
   - Text (light/dark)
   - Gray scale

2. Typography
   - Headline: 24px
   - Subheadline: 18px
   - Body: 16px
   - Caption: 14px
   - Small: 12px

### Layout System
1. Spacing Scale
   - xs: 4px
   - sm: 8px
   - md: 16px
   - lg: 24px
   - xl: 32px
   - xxl: 48px

2. Layout Patterns
   - Card-based design
   - List views
   - Grid systems
   - Responsive layouts

### Animation Patterns
1. Timing
   - Fast: 200ms
   - Normal: 300ms
   - Slow: 500ms

2. Types
   - Fade transitions
   - Scale animations
   - Slide transitions
   - Loading states

## Data Patterns

### Mock Data Structure
1. Users
   - Basic info
   - Avatar
   - Groups

2. Groups
   - Details
   - Members
   - Posts
   - Statistics

3. Posts
   - Content
   - Media
   - Metadata
   - Breaking news status

### Future API Integration
1. RESTful Endpoints
   - Authentication
   - CRUD operations
   - Real-time updates

2. Data Flow
   - Request/Response handling
   - Error management
   - Caching strategy 