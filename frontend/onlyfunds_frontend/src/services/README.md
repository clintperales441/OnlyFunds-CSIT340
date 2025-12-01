# OnlyFunds API Integration Guide

## Overview
This directory contains all the API service modules for connecting the OnlyFunds React frontend with the Spring Boot backend.

## Backend API Base URL
- **Development**: `http://localhost:8080/api`
- **Production**: Update in `src/services/api.js`

## Services Available

### 1. **User Service** (`userService.js`)
Handles user authentication and profile management.

#### Methods:
- `register(userData)` - Register a new user
- `login(credentials)` - Login user
- `getUserById(userId)` - Get user by ID
- `logout()` - Logout and clear localStorage
- `getCurrentUser()` - Get current user from localStorage

#### Example Usage:
```javascript
import { userService } from '../services/userService';

// Register
const userData = {
  firstName: 'John',
  lastName: 'Doe',
  email: 'john@example.com',
  password: 'password123',
  age: 25,
  gender: 'MALE',
  accountType: 'DONOR', // or 'CAMPAIGN_CREATOR'
  agreeToTerms: true
};
const response = await userService.register(userData);

// Login
const credentials = { email: 'john@example.com', password: 'password123' };
const user = await userService.login(credentials);
```

---

### 2. **Campaign Service** (`campaignService.js`)
Manages campaign-related operations.

#### Methods:
- `getAllCampaigns()` - Get all campaigns
- `getCampaignById(campaignId)` - Get campaign details
- `createCampaign(campaignData)` - Create new campaign
- `getCampaignsByUser(userId)` - Get user's campaigns
- `getCampaignsByCategory(categoryId)` - Get campaigns by category

#### Example Usage:
```javascript
import { campaignService } from '../services/campaignService';

// Create campaign
const campaignData = {
  title: 'Help Build a School',
  categoryId: '1',
  description: 'We need help building a school...',
  goal: 50000,
  daysLeft: 60,
  imageUrl: 'https://example.com/image.jpg'
};
const campaign = await campaignService.createCampaign(campaignData);

// Get all campaigns
const campaigns = await campaignService.getAllCampaigns();
```

---

### 3. **Donation Service** (`donationService.js`)
Handles donation processing.

#### Methods:
- `createDonation(donationData)` - Process a donation
- `getDonationsByCampaign(campaignId)` - Get donations for a campaign
- `getDonationsByUser(userId)` - Get user's donation history

#### Example Usage:
```javascript
import { donationService } from '../services/donationService';

const donationData = {
  campaignId: 'campaign-123',
  userId: 'user-456', // null for anonymous
  amount: 100,
  paymentMethod: 'CREDIT_CARD', // or 'DEBIT_CARD'
  donorInfo: {
    firstName: 'Jane',
    lastName: 'Smith',
    email: 'jane@example.com',
    phone: '123-456-7890',
    message: 'Keep up the good work!'
  },
  cardInfo: {
    name: 'Jane Smith',
    cvc: '123',
    expiry: '12/25' // MM/YY format
  }
};

const receipt = await donationService.createDonation(donationData);
```

---

### 4. **Category Service** (`categoryService.js`)
Manages campaign categories.

#### Methods:
- `getAllCategories()` - Get all categories
- `createCategory(categoryData)` - Create new category (admin)

#### Example Usage:
```javascript
import { categoryService } from '../services/categoryService';

// Get all categories
const categories = await categoryService.getAllCategories();

// Create category
const categoryData = {
  category: 'Environment',
  image: 'https://example.com/environment.jpg'
};
const newCategory = await categoryService.createCategory(categoryData);
```

---

## Authentication & Authorization

The API uses JWT tokens for authentication. Tokens are automatically:
- Stored in `localStorage` after login/register
- Attached to all API requests via interceptors
- Cleared on logout or 401 errors

### Protected Routes
Most endpoints require authentication. The API will:
1. Check for token in `localStorage`
2. Add token to `Authorization` header
3. Redirect to login on 401 (Unauthorized)

---

## Error Handling

All services throw errors with messages. Handle them in your components:

```javascript
try {
  const user = await userService.login(credentials);
  // Success handling
} catch (error) {
  // error.message contains the error description
  console.error(error.message);
}
```

---

## CORS Configuration

Backend is configured to accept requests from:
- `http://localhost:3000` (React development server)

For production, update CORS settings in `backend/src/main/java/com/onlyfunds/backend/config/CorsConfig.java`

---

## Backend Endpoints Reference

### User Endpoints
- `POST /api/users/register` - Register user
- `POST /api/users/login` - Login user
- `GET /api/users/{id}` - Get user by ID

### Campaign Endpoints
- `GET /api/campaigns` - Get all campaigns
- `GET /api/campaigns/{id}` - Get campaign by ID
- `POST /api/campaigns` - Create campaign
- `GET /api/campaigns/user/{userId}` - Get user's campaigns
- `GET /api/campaigns/category/{categoryId}` - Get campaigns by category

### Donation Endpoints
- `POST /api/donations` - Create donation
- `GET /api/donations/campaign/{campaignId}` - Get campaign donations
- `GET /api/donations/user/{userId}` - Get user donations

### Category Endpoints
- `GET /api/categories` - Get all categories
- `POST /api/categories` - Create category

---

## Running the Application

### 1. Start Backend (Spring Boot)
```bash
cd backend/onlyfunds_backend
./mvnw spring-boot:run
```
Backend runs on `http://localhost:8080`

### 2. Start Frontend (React)
```bash
cd frontend/onlyfunds_frontend
npm start
```
Frontend runs on `http://localhost:3000`

---

## Troubleshooting

### CORS Errors
- Ensure backend is running on port 8080
- Check CORS configuration in backend
- Verify `withCredentials: true` in api.js

### Authentication Errors
- Clear localStorage: `localStorage.clear()`
- Check token expiration
- Verify user credentials

### Connection Errors
- Ensure backend is running
- Check database connection (PostgreSQL)
- Verify API_BASE_URL in `api.js`

---

## Next Steps

### Security Enhancements (TODO)
1. Implement password hashing (BCrypt) in backend
2. Add JWT token generation and validation
3. Implement card tokenization for payments
4. Add refresh token mechanism

### Features to Implement
1. Profile page with campaign/donation history
2. Campaign updates and comments
3. Search and filter campaigns
4. Payment gateway integration
5. Email notifications

---

## Contact
For issues or questions, contact the OnlyFunds development team.
