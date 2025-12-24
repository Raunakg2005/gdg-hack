# Test Login Credentials

## How to Create Test Account

### Method 1: Use the Registration Page
1. Start dev server: `npm run dev`
2. Go to: http://localhost:3000/auth/register
3. Register with these details:
   - **Email**: `demo@lostandfound.com`
   - **Password**: `demo123456`
   - **Name**: `Demo User`
   - **Phone**: `1234567890` (optional)

### Method 2: Use Firebase Console
1. Go to [Firebase Console](https://console.firebase.google.com)
2. Select your project
3. Navigate to **Authentication** > **Users**
4. Click "Add User"
5. Create user with email and password

## Default Admin Email
Admin functionality is available for:
- `your-email@example.com` (update this in code)

To change admin email, search for `your-email@example.com` in:
- `/src/app/admin/page.tsx`
- `/src/app/admin/users/page.tsx`  
- `/src/app/items/page.tsx`

## Login URLs
- **Login**: http://localhost:3000/auth/login
- **Register**: http://localhost:3000/auth/register
- **Items**: http://localhost:3000/items
- **Admin**: http://localhost:3000/admin

## Quick Start
```bash
# Start the app
npm run dev

# Create account at
# http://localhost:3000/auth/register

# Then login at  
# http://localhost:3000/auth/login
```

## Note
Firebase Authentication requires:
- Valid email format
- Password minimum 6 characters
- Email must be unique (not already registered)
