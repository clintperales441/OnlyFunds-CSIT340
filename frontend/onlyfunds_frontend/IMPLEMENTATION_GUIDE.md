# Clean Architecture Implementation Guide

## 📋 Completed Components

### ✅ Authentication Pages
- **LoginPage.jsx** - User login with validation and error handling
- **RegisterPage.jsx** - User registration with multi-step validation
- **ProfilePage.jsx** - User profile with personal info and campaign management

### ✅ Campaign Pages
- **CreateCampaignPage.jsx** - Campaign creation form with validation
- **HomePage.jsx** - Landing page with featured campaigns
- **CampaignsPage.jsx** - Campaigns listing with search and filtering

### ✅ General Pages
- **ContactPage.jsx** - Contact form with validation
- **Layout.jsx** - Main layout wrapper with header, footer, and nav

### ✅ Components
- **Navbar.jsx** - Smart navigation based on auth status
- **Footer.jsx** - Consistent footer
- **CampaignCard.jsx** - Reusable campaign display
- **ProtectedRoute.jsx** - Route guard for authenticated pages
- **ErrorBoundary.jsx** - Error handling boundary
- **ScrollProgressBar.jsx** - Progress indicator

### ✅ State Management
- **AuthContext.js** - Authentication state
- **CampaignContext.js** - Campaign state
- **useAuth.js** - Auth hook
- **useCampaigns.js** - Campaign hook
- **useForm.js** - Form management hook

### ✅ Services
- **userService.js** - User/auth API calls
- **campaignService.js** - Campaign API calls
- **contactService.js** - Contact form API calls

---

## 🚀 Installation & Setup

### Prerequisites
```bash
npm install react-router-dom
```

### Update App.jsx
The App.jsx is already configured with:
- React Router v6
- AuthProvider wrapper
- CampaignProvider wrapper
- Protected routes
- Error boundaries

### Running the App
```bash
cd frontend/onlyfunds_frontend
npm start
```

---

## 📁 Project Structure

```
src/
├── components/              # Reusable UI components
│   ├── Navbar.jsx
│   ├── Footer.jsx
│   ├── CampaignCard.jsx
│   ├── ProtectedRoute.jsx
│   ├── ErrorBoundary.jsx
│   └── ScrollProgressBar.jsx
│
├── pages/                   # Page components
│   ├── Layout.jsx           # Main layout wrapper
│   ├── HomePage.jsx
│   ├── CampaignsPage.jsx
│   ├── LoginPage.jsx
│   ├── RegisterPage.jsx
│   ├── ProfilePage.jsx
│   ├── CreateCampaignPage.jsx
│   └── ContactPage.jsx
│
├── context/                 # State management
│   ├── AuthContext.js
│   └── CampaignContext.js
│
├── hooks/                   # Custom hooks
│   ├── useAuth.js
│   ├── useCampaigns.js
│   └── useForm.js
│
├── services/                # API services
│   ├── userService.js
│   ├── campaignService.js
│   ├── contactService.js
│   └── api.js (existing)
│
├── constants/               # App constants
│   └── routes.js
│
├── App.jsx                  # Main router
├── index.jsx                # Entry point
└── App.css                  # Global styles
```

---

## 🔑 Key Features

### 1. **Authentication Flow**
```javascript
// Login
const { login } = useAuth();
await login(email, password);

// Register
const { register } = useAuth();
await register(userData);

// Check auth status
const { isAuthenticated, currentUser } = useAuth();
```

### 2. **Campaign Management**
```javascript
// Get campaigns
const { campaigns, fetchCampaigns } = useCampaigns();

// Create campaign
const { createCampaign } = useCampaigns();
await createCampaign(campaignData);

// Select campaign
const { selectCampaign } = useCampaigns();
selectCampaign(campaignId);
```

### 3. **Form Handling**
```javascript
const { formData, errors, handleChange, handleSubmit } = useForm(
  initialValues,
  onSubmit,
  validate
);
```

### 4. **Protected Routes**
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

### 5. **Error Handling**
```javascript
<ErrorBoundary>
  <App />
</ErrorBoundary>
```

---

## 🎨 Styling Conventions

All components follow consistent styling:
- **Colors**: Primary (#007bff), Success (#28a745), Danger (#dc3545)
- **Spacing**: Rem-based (1rem = 16px)
- **Responsive**: Mobile-first approach
- **Shadows**: Subtle box-shadows for depth

---

## 📝 Form Validation Examples

### Login Form
```javascript
const validateForm = (data) => {
  const errors = {};
  if (!data.email.trim()) errors.email = 'Email is required';
  if (!/\S+@\S+\.\S+/.test(data.email)) errors.email = 'Email is invalid';
  if (!data.password) errors.password = 'Password is required';
  return errors;
};
```

### Registration Form
- First/Last name validation
- Email format validation
- Password strength requirements
- Password confirmation matching
- Terms agreement validation

### Campaign Creation
- Title length (min 5 characters)
- Description length (min 20 characters)
- Category selection
- Goal amount validation (must be > 0)
- Image file size validation

### Contact Form
- Name validation
- Email validation
- Subject validation
- Message length (min 10 characters)

---

## 🧪 Testing Guide

### Unit Tests (Next Phase)
```javascript
// Example: Testing useAuth hook
test('useAuth returns auth state and methods', () => {
  const { result } = renderHook(() => useAuth());
  expect(result.current.isAuthenticated).toBe(false);
  expect(result.current.login).toBeDefined();
});
```

### Integration Tests
- Test complete user flows (login → create campaign → donate)
- Test error scenarios
- Test data persistence

---

## 🔒 Security Best Practices

1. **Authentication**
   - Tokens stored in localStorage
   - Protected routes with ProtectedRoute component
   - Automatic redirect to login if not authenticated

2. **Form Validation**
   - Client-side validation before submission
   - Server-side validation recommended

3. **Error Handling**
   - Sensitive error details not exposed to users
   - ErrorBoundary prevents app crashes

---

## 🚨 Troubleshooting

### Issue: Routes not working
**Solution**: Ensure BrowserRouter is wrapping your routes in App.jsx

### Issue: Context not available
**Solution**: Ensure providers wrap your components in App.jsx

### Issue: Form not submitting
**Solution**: Check form validation is returning empty errors object

### Issue: Images not loading
**Solution**: Ensure image paths are correct and server is serving them

---

## 📈 Performance Optimization (Next Phase)

1. **Code Splitting**
   ```javascript
   const HomePage = React.lazy(() => import('./pages/HomePage'));
   ```

2. **Memoization**
   ```javascript
   const MemoizedComponent = React.memo(MyComponent);
   ```

3. **Bundle Size Analysis**
   ```bash
   npm run build
   npm install -g serve
   serve -s build
   ```

---

## 🎓 Learning Resources

- [React Router v6 Documentation](https://reactrouter.com/)
- [React Context API Guide](https://react.dev/learn/passing-data-deeply-with-context)
- [Custom Hooks Patterns](https://react.dev/learn/reusing-logic-with-custom-hooks)
- [Error Boundaries](https://react.dev/reference/react/Component#catching-rendering-errors-with-an-error-boundary)

---

## ✨ Next Steps

1. **Deploy Frontend**
   - Build: `npm run build`
   - Deploy to Vercel, Netlify, or AWS

2. **Backend Integration**
   - Ensure all API endpoints match service calls
   - Set up CORS properly
   - Implement JWT authentication

3. **Testing**
   - Write unit tests for services
   - Write component tests
   - Set up E2E tests with Cypress

4. **Monitoring**
   - Set up error tracking (Sentry)
   - Set up analytics (Google Analytics)
   - Monitor performance (Web Vitals)

5. **Polish**
   - Add loading skeletons
   - Add animations
   - Improve accessibility (ARIA labels)
   - Dark mode support

---

## 💡 Tips

- Use the `ROUTES` constant everywhere instead of hardcoding paths
- Always wrap async operations in try-catch
- Clear errors after user action
- Show loading states during API calls
- Test on mobile devices frequently

---

## 📞 Support

For questions or issues:
1. Check the REFACTOR_GUIDE.md
2. Review component examples
3. Check error logs in browser console
4. Review network tab in DevTools

---

## ✅ Checklist for New Developers

- [ ] Read REFACTOR_GUIDE.md
- [ ] Understand project structure
- [ ] Review AuthContext and CampaignContext
- [ ] Review useForm hook implementation
- [ ] Review a completed page component
- [ ] Understand routing setup
- [ ] Test the app locally
- [ ] Review error handling patterns
- [ ] Check CSS naming conventions
- [ ] Ready to develop!

---

**Last Updated**: May 8, 2026
**Version**: 1.0.0
**Maintainers**: OnlyFunds Dev Team
