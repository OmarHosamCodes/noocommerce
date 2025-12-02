# Authentication Implementation

This document describes the authentication system implemented for the Next.js WooCommerce storefront.

## Overview

The authentication system integrates with WordPress/WooCommerce using JWT (JSON Web Tokens) for secure user authentication.

## Prerequisites

To use authentication, you need to install the JWT Authentication plugin on your WordPress/WooCommerce site:

**JWT Authentication for WP REST API**
- Plugin URL: https://wordpress.org/plugins/jwt-authentication-for-wp-rest-api/
- Or search for "JWT Authentication for WP REST API" in your WordPress admin plugins section

### WordPress Configuration

After installing the JWT plugin, add these lines to your `wp-config.php` file:

```php
define('JWT_AUTH_SECRET_KEY', 'your-secret-key-here');
define('JWT_AUTH_CORS_ENABLE', true);
```

Generate a secure secret key from: https://api.wordpress.org/secret-key/1.1/salt/

## Features

### 1. User Registration
- New users can create accounts with username, email, and password
- Validates email format and password strength (minimum 6 characters)
- Creates WooCommerce customer accounts
- Optional first name and last name fields

### 2. User Login
- Login with username or email
- Secure JWT token-based authentication
- Persistent login sessions using Zustand with localStorage

### 3. User Authentication State
- Global authentication state managed with Zustand
- Automatic token injection in API requests
- User profile information stored locally

## File Structure

```
src/
├── app/
│   ├── api/
│   │   └── auth/
│   │       ├── login/route.ts      # Login API endpoint
│   │       ├── register/route.ts   # Registration API endpoint
│   │       └── validate/route.ts   # Token validation endpoint
│   └── (pages)/
│       ├── login/page.tsx          # Login page
│       └── register/page.tsx       # Register page
├── components/
│   ├── auth/
│   │   ├── LoginForm.tsx           # Login form component
│   │   └── RegisterForm.tsx        # Registration form component
│   └── UserMenu.tsx                # User menu in navbar
├── store/
│   └── authStore.ts                # Authentication state management
└── lib/
    └── axios.ts                    # Updated with auth interceptors
```

## Usage

### Login
Navigate to `/login` and enter your credentials:
- Username or email
- Password

### Register
Navigate to `/register` and fill in the form:
- Username (required)
- Email (required)
- Password (required, min 6 characters)
- Confirm Password (required)
- First Name (optional)
- Last Name (optional)

### Using Authentication in Components

```tsx
import { useAuthStore } from "@/store/authStore";

function MyComponent() {
  const { isAuthenticated, user, logout } = useAuthStore();

  if (!isAuthenticated) {
    return <p>Please login</p>;
  }

  return (
    <div>
      <p>Welcome, {user?.displayName}!</p>
      <button onClick={logout}>Logout</button>
    </div>
  );
}
```

### Making Authenticated API Requests

The axios instance automatically includes the authentication token in requests:

```tsx
import apiClient from "@/lib/axios";

// Token is automatically included in the Authorization header
const response = await apiClient.get("/api/protected-route");
```

## API Endpoints

### POST /api/auth/login
Authenticate a user and return a JWT token.

**Request Body:**
```json
{
  "username": "user@example.com",
  "password": "password123"
}
```

**Response:**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": 1,
    "email": "user@example.com",
    "displayName": "John Doe",
    "username": "johndoe"
  }
}
```

### POST /api/auth/register
Create a new user account.

**Request Body:**
```json
{
  "username": "johndoe",
  "email": "john@example.com",
  "password": "password123",
  "firstName": "John",
  "lastName": "Doe"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Account created successfully",
  "user": {
    "id": 1,
    "email": "john@example.com",
    "username": "johndoe",
    "firstName": "John",
    "lastName": "Doe"
  }
}
```

### POST /api/auth/validate
Validate a JWT token.

**Request Body:**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

**Response:**
```json
{
  "valid": true,
  "data": { ... }
}
```

## Security Features

1. **JWT Token Authentication**: Secure token-based authentication
2. **Password Validation**: Minimum 6 characters required
3. **Email Validation**: Proper email format validation
4. **Secure Storage**: Tokens stored in localStorage with Zustand persist
5. **Automatic Token Injection**: Axios interceptors handle token inclusion
6. **Unauthorized Handling**: Automatic logout on 401 responses

## Error Handling

The system handles various error scenarios:
- Invalid credentials
- Duplicate username/email
- Network errors
- Token expiration
- Validation errors

All errors are displayed to users via toast notifications using Sonner.

## Future Enhancements

Potential improvements:
- Password reset functionality
- Email verification
- Social login (Google, Facebook, etc.)
- Two-factor authentication
- User profile management page
- Order history integration
- Remember me functionality
- Account deletion
