# HackOn 25 Auth & Orders API

A full-stack Next.js 14 project with a robust authentication system, user profile management, and order management, using MongoDB and Mongoose. This project is designed for easy testing and extensibility, with a modern dark-themed frontend and a clear API structure.

---

## Features

- **User Registration & Login**
  - Secure password hashing with bcrypt
  - Email uniqueness enforced
  - Login with email and password
- **User Profile Management**
  - Fetch, update, and delete user profiles
  - Password update with re-hashing
- **Order Management**
  - Add orders (with items, price, quantity, random delivery date)
  - Fetch all orders for a user
  - Order status tracking (pending, shipped, delivered, cancelled)
- **API Testing UI**
  - `/api-test` page for testing all user and order APIs interactively
  - Modern, dark-themed UI for all forms and test tools

---

## Project Structure

```
src/
  app/
    api/
      users/
        [userId]/
          route.js         # User profile: GET, PUT, DELETE
          orders/
            route.js       # User orders: GET, POST
      login/route.js       # Login API
      register/route.js    # Registration API
    components/
      LoginForm.js         # Login form UI
      RegisterForm.js      # Registration form UI
      UserProfileTest.js   # API test tool for user profile
      UserOrdersTest.js    # API test tool for orders
    api-test/page.js       # Main API testing page
    login/page.js          # Login page
    register/page.js       # Register page
    page.js                # Landing page with navigation
  lib/
    dbConnect.js           # MongoDB connection helper
  models/
    User.js                # Mongoose User schema (with orders)
```

---

## API Endpoints

### Registration
- **POST** `/api/users/register`
  - `{ name, email, password }`
  - Creates a new user (password is hashed)

### Login
- **POST** `/api/users/login`
  - `{ email, password }`
  - Returns user data if credentials are valid

### User Profile
- **GET** `/api/users/[userId]`
  - Returns user info (without password)
- **PUT** `/api/users/[userId]`
  - Update user info (name, email, password, etc.)
- **DELETE** `/api/users/[userId]`
  - Delete user

### User Orders
- **GET** `/api/users/[userId]/orders`
  - Returns all orders for the user
- **POST** `/api/users/[userId]/orders`
  - `{ name, price, quantity }` or `{ items: [{ name, price, quantity }, ...] }`
  - Adds a new order (with random delivery date)

---

## Database Schema

- **User**
  - name, email, password (hashed), orders, rewards, mode_of_payment, eco_agree
- **Order**
  - items: array of `{ name, price, quantity }`
  - order_date, delivery_date (randomized), status

---

## How to Use

1. **Install dependencies:**
   ```bash
   npm install
   ```
2. **Set up MongoDB:**
   - Add your MongoDB URI to your environment variables (e.g., `.env.local`)
3. **Run the development server:**
   ```bash
   npm run dev
   ```
4. **Test APIs via UI:**
   - Visit `/api-test` for a full-featured API testing dashboard
   - Use `/login` and `/register` for authentication

---

## Tech Stack
- Next.js 14 (App Router)
- React 18
- MongoDB & Mongoose
- bcrypt (password hashing)
- Modern CSS (dark theme)

---

## Customization & Extensibility
- Add more fields to the user or order schema as needed
- Extend the API with more endpoints (e.g., order status updates, admin routes)
- UI is component-based and easy to extend

---

## License
MIT
