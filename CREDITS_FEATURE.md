# Max User Credits Feature ($1000 API Credits)

## Overview
This feature enables the allocation of $1000 in API credits to users on the "Max Plan" tier, with support for multiple pricing tiers.

## Implementation Details

### Backend Changes (server.js)

#### Database Structure
- **In-memory database** with support for:
  - Users with credit information
  - Available plans (Max, Pro, Starter)
  - Credit transactions tracking

#### Available Plans
1. **Max Plan** - $1000 in credits (Recommended tier)
2. **Pro Plan** - $500 in credits
3. **Starter Plan** - $100 in credits

#### API Endpoints

**Plans Management:**
- `GET /api/plans` - Get all available plans

**User Management:**
- `POST /api/users` - Create new user with plan and credits
  - Required fields: `name`, `email`, `planId`
  - Returns: User object with allocated credits
- `GET /api/users/:id` - Get user details
- `GET /api/users/:id/credits` - Get user's credit balance
- `POST /api/users/:id/verify` - Verify user with security code

**System:**
- `GET /api/health` - Health check endpoint

### Frontend Changes

#### 1. UserCreatePopup.js (Enhanced)
- Plan selection interface with visual cards
- Real-time credit allocation display
- Default selection of "Max Plan" ($1000 credits)
- Async plan fetching from API
- Form validation and error handling

#### 2. UserCreatePopup.css (New)
- Responsive design for all screen sizes
- Plan cards with hover effects
- Selected plan highlighting
- Credit summary display
- Form styling and animations

#### 3. CreditBalance.js (New)
- Display current user credits
- Show credit progress bar
- Plan information display
- Warning alerts when credits are low
- Real-time credit fetching from API

#### 4. CreditBalance.css (New)
- Clean credit balance display
- Color-coded status indicators (Good/Warning/Critical)
- Progress bar visualization
- Responsive layout

### Redux State Management

#### Action.js (Enhanced)
- `setUser()` - Set username
- `setUserCredits()` - Update user credits
- `setUserInfo()` - Store full user information
- `consumeCredits()` - Deduct credits for API usage

#### Reducer.js (Enhanced)
- Extended state with:
  - `user` - Full user object
  - `userCredits` - Credits information
  - `userInfo` - User information details

## Usage

### Creating a User with Max Credits
```javascript
// POST /api/users
{
  "name": "John Doe",
  "email": "john@example.com",
  "planId": "max"  // Automatically allocates $1000 credits
}

// Response
{
  "success": true,
  "user": {
    "id": "user_1234567890_xyz",
    "name": "John Doe",
    "email": "john@example.com",
    "planId": "max",
    "credits": 1000,
    "maxCredits": 1000,
    "createdAt": "2024-01-01T00:00:00Z",
    "verified": false
  },
  "message": "User created with 1000 credits from Max Plan"
}
```

### Checking User Credits
```javascript
// GET /api/users/user_1234567890_xyz/credits

// Response
{
  "userId": "user_1234567890_xyz",
  "credits": 1000,
  "maxCredits": 1000,
  "plan": "max"
}
```

## Component Integration

### Using CreditBalance Component
```jsx
import CreditBalance from './CreditBalance';

// In your component:
<CreditBalance userId={user.id} />
```

### Using UserCreatePopup Component
```jsx
import UserCreatePopup from './UserCreatePopup';

// In your component:
<UserCreatePopup
  onClose={() => setShowPopup(false)}
  onSubmit={handleUserCreated}
/>
```

## Future Enhancements

1. **Database Integration**
   - Replace in-memory storage with MongoDB/PostgreSQL
   - Add credit transaction history

2. **Advanced Features**
   - Credit consumption tracking
   - Automatic credit refills
   - Plan upgrade/downgrade
   - Credit expiration policies

3. **Billing Integration**
   - Stripe/PayPal integration
   - Automatic billing on plan changes
   - Invoice generation

4. **Admin Features**
   - User credit management panel
   - Credit adjustment/refund system
   - Usage analytics

5. **Authentication**
   - JWT-based authentication
   - Email verification flow
   - Password reset functionality

## Testing

The implementation includes:
- Form validation
- API error handling
- Credit display with status indicators
- Responsive design for mobile and desktop

To test:
1. Start the server: `npm run start`
2. Open user creation form
3. Select a plan (default is Max Plan with $1000)
4. Submit user creation
5. View allocated credits in the credit balance display
