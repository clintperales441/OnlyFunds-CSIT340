# OnlyFunds Clean Architecture Refactor Guide

## Overview

This refactored version of OnlyFunds implements modern React best practices and clean architecture principles.

## Architecture Changes

### 1. **Routing**
- **Before**: Manual view state management in App.js
- **After**: React Router v6 with proper route definitions
- **Benefit**: Better performance, browser history, deep linking support

```javascript
// Routes are centralized in constants/routes.js
export const ROUTES = {
  HOME: '/',
  CAMPAIGNS: '/campaigns',
  CREATE_CAMPAIGN: '/campaign/create',
  LOGIN: '/login',
};
```

### 2. **State Management**
- **Before**: Everything in App.js state
- **After**: Context API with separate concerns
- **Providers**:
  - `AuthContext`: Authentication state
  - `CampaignContext`: Campaign data

```javascript
// Usage in components
const { currentUser, login, logout } = useAuth();
const { campaigns, createCampaign } = useCampaigns();
```

### 3. **Custom Hooks**
- `useAuth()`: Authentication operations
- `useCampaigns()`: Campaign operations
- `useForm()`: Form state and validation

### 4. **Service Layer**
- Separated API calls into services
- `userService.js`: Auth-related API calls
- `campaignService.js`: Campaign-related API calls
- `contactService.js`: Contact form API calls

### 5. **Component Organization**

```
src/
├── components/          # Reusable components
│   ├── Navbar.jsx
│   ├── Footer.jsx
│   ├── CampaignCard.jsx
│   ├── ProtectedRoute.jsx
│   └── ScrollProgressBar.jsx
├── context/            # Global state
│   ├── AuthContext.js
│   └── CampaignContext.js
├── hooks/              # Custom hooks
│   ├── useAuth.js
│   ├── useCampaigns.js
│   └── useForm.js
├── pages/              # Page components
│   ├── Layout.jsx      # Main layout wrapper
│   ├── HomePage.jsx
│   └── CampaignsPage.jsx
├── services/           # API services
│   ├── userService.js
│   ├── campaignService.js
│   └── contactService.js
├── constants/          # App constants
│   └── routes.js
└── App.jsx             # Main router setup
```

### 6. **Protected Routes**

Only authenticated users can access certain routes:

```javascript
<Route
  path={ROUTES.CREATE_CAMPAIGN}
  element={
    <ProtectedRoute>
      <CreateCampaignPage />
    </ProtectedRoute>
  }
/>
```

## Key Improvements

✅ **Separation of Concerns**
- Business logic in services
- State management in contexts
- UI logic in components

✅ **Reusability**
- Custom hooks for common operations
- Reusable components (CampaignCard, etc.)
- Centralized constants

✅ **Maintainability**
- Clear folder structure
- Single responsibility principle
- Easy to locate and modify code

✅ **Scalability**
- Easy to add new features
- Simple to integrate new pages
- Modular state management

✅ **Performance**
- React Router lazy loading support
- Context optimization with proper providers
- No unnecessary re-renders

## Migration Guide

### Step 1: Update App.js
Replace the old monolithic App.js with the new Router-based setup.

### Step 2: Update index.js
Ensure index.js imports the new App.jsx:
```javascript
import App from './App';
```

### Step 3: Move Pages
Move all page components to the `pages/` directory and update imports.

### Step 4: Create Services
Extract API calls from components into service files.

### Step 5: Update Components
Replace manual state passing with hooks:

```javascript
// Old way
<Login onLogin={handleLogin} />

// New way
const { login } = useAuth();
```

## Next Steps

### Phase 2: Enhanced Features
- Add Redux for complex state (optional)
- Implement error boundaries
- Add loading states and skeleton screens
- Implement caching strategies

### Phase 3: Testing
- Unit tests for utilities
- Component tests with React Testing Library
- Integration tests for API services
- E2E tests with Cypress

### Phase 4: Performance
- Code splitting with React.lazy()
- Image optimization
- Bundle size optimization
- SEO improvements

## Common Patterns

### Fetching Data

```javascript
const CampaignsPage = () => {
  const { campaigns, fetchCampaigns, loading, error } = useCampaigns();

  useEffect(() => {
    fetchCampaigns();
  }, [fetchCampaigns]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      {campaigns.map(campaign => (
        <CampaignCard key={campaign.id} campaign={campaign} />
      ))}
    </div>
  );
};
```

### Form Handling

```javascript
const CreateCampaignPage = () => {
  const { createCampaign } = useCampaigns();
  
  const { formData, errors, handleChange, handleSubmit } = useForm(
    { title: '', description: '', goalAmount: '' },
    async (data) => {
      await createCampaign(data);
    },
    (data) => {
      const errors = {};
      if (!data.title) errors.title = 'Title is required';
      return errors;
    }
  );

  return (
    <form onSubmit={handleSubmit}>
      <input
        name="title"
        value={formData.title}
        onChange={handleChange}
      />
      {errors.title && <span>{errors.title}</span>}
    </form>
  );
};
```

### Authentication Check

```javascript
const ProfilePage = () => {
  const { currentUser, isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to={ROUTES.LOGIN} />;
  }

  return <div>Welcome, {currentUser.firstName}!</div>;
};
```

## Benefits Summary

| Aspect | Before | After |
|--------|--------|-------|
| State Management | 1 giant App.js | Modular contexts |
| Routing | Manual view state | React Router |
| Code Reuse | Low | High |
| Testability | Difficult | Easy |
| Maintainability | Hard | Easy |
| Scalability | Poor | Excellent |
| Performance | Average | Optimized |

## Questions?

Refer to the specific files in this branch for implementation details.
