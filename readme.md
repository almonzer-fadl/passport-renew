# Tajdeed - The Passport Renewal Service

## The Goal

**Tajdeed** is a modern web application designed to digitize and simplify the passport renewal process for Sudanese citizens. Our goal is to create a user-friendly, secure, and efficient platform that eliminates the challenges of the traditional offline system. This project is envisioned as a cornerstone of a larger digital ecosystem for all Sudanese government services, aiming to bring convenience and accessibility to the people.

## The Problem

Renewing a passport in Sudan can be a difficult and time-consuming process. It often involves:

-   **Long Lines:** Spending countless hours waiting in queues.
-   **Wasted Time:** Significant disruption to daily plans, work, and personal goals.
-   **Manual Inefficiencies:** The offline process is prone to errors and lacks the efficiency of modern digital systems.

This project was born out of the need to address these issues and provide a respectable, streamlined experience for all Sudanese people.

## Our Solution

Tajdeed transforms the renewal process into a simple, multi-step online application that can be completed from anywhere. We prioritize two main pillars:

1.  **Integrity of Data:** We use Artificial Intelligence (AI) models directly in the browser to ensure that the photos submitted meet the required standards. This reduces the chances of application rejection due to incorrect photos.
2.  **Security:** All user data, especially sensitive information, is handled with utmost care. We use industry-standard encryption for passwords and secure authorization mechanisms to protect user accounts and application data.

## Key Features

-   **User Authentication:** Secure registration and login system for users.
-   **Multi-Step Application Form:** An intuitive, step-by-step process to guide users through the application.
-   **AI-Powered Photo Validation:** The application uses `face-api.js` to perform in-browser checks on personal photos, ensuring a face is clearly visible and centered.
-   **Digital Signature Capture:** Users can draw their signature directly on the screen.
-   **Application Drafts:** Your progress is automatically saved in the browser, so you can complete the application at your own pace.
-   **User Dashboard:** A personal dashboard to view and track the status of all your renewal applications (e.g., Pending, Approved, Rejected).

## Technology Stack

This application is built with a modern, robust, and scalable technology stack.

### Frontend

-   **Framework:** [React](https://react.dev/) (built with [Vite](https://vitejs.dev/))
-   **Routing:** [React Router](https://reactrouter.com/)
-   **Styling:** [Tailwind CSS](https://tailwindcss.com/) & [DaisyUI](https://daisyui.com/)
-   **AI/ML:** [face-api.js](https://github.com/justadudewhohacks/face-api.js/) for in-browser face detection.

### Backend

-   **Framework:** [Node.js](https://nodejs.org/) with [Express.js](https://expressjs.com/)
-   **Database:** [MongoDB](https://www.mongodb.com/) (with [Mongoose](https://mongoosejs.com/) as the ODM)
-   **Authentication:** [JSON Web Tokens (JWT)](https://jwt.io/)
-   **Password Hashing:** [bcrypt](https://www.npmjs.com/package/bcrypt)

## How to Run the Project

To get the project up and running on your local machine, follow these steps.

### Prerequisites

-   Node.js and npm (or yarn) installed.
-   A running instance of MongoDB.

### 1. Backend Setup

```bash
# Navigate to the backend directory
cd backend

# Install dependencies
npm install

# Create a .env file in the backend directory
# and add the following variables:
# MONGODB_URI=<your_mongodb_connection_string>
# JWT_SECRET=<your_jwt_secret>
# JWT_EXPIRES_IN=7d

# Start the development server
npm run dev
```

The backend server will be running on `http://localhost:5000`.

### 2. Frontend Setup

```bash
# Navigate to the frontend directory
cd frontend

# Install dependencies
npm install

# Start the development server
npm run dev
```

The frontend development server will start, and you can access the application in your browser, usually at `http://localhost:5173`.

## Detailed Codebase Overview

### Backend (`/backend`)

The backend is a monolithic Node.js server built with Express.js. It's responsible for handling all business logic, data persistence, and authentication.

-   **`server.js`**: This is the heart of the backend. It initializes the Express application, establishes a connection to the MongoDB database using Mongoose, and configures middleware such as `cors` for cross-origin requests and `express.json` for parsing JSON request bodies. All API routes are defined and handled within this file.

-   **`userSchema.js`**: This file defines the data model for the `User` collection using Mongoose schemas. It specifies the structure, data types, and validation rules for user documents and their embedded application sub-documents.

-   **Authentication**:
    -   **Registration (`/api/register`)**: When a user registers, their password is not stored in plain text. Instead, it's hashed using `bcrypt` for security. A new user document is then created in the database.
    -   **Login (`/api/login`)**: During login, the provided password is compared against the stored hash. If successful, a **JSON Web Token (JWT)** is generated and sent to the client. This token is used to authenticate subsequent requests.
    -   **Token Verification (`/api/verify-token`)**: This is a protected endpoint that uses the `authenticateToken` middleware. This middleware checks for a valid JWT in the `Authorization` header of incoming requests, ensuring that only logged-in users can access protected resources.

-   **API Endpoints**:
    -   `POST /api/register`: Handles new user registration.
    -   `POST /api/login`: Authenticates users and issues a JWT.
    -   `GET /api/verify-token`: Verifies a user's token to maintain their session.
    -   `POST /api/create-app`: A protected route that allows an authenticated user to submit a new passport renewal application. The application data is pushed into the `applications` array of the corresponding user document.
    -   `GET /api/user-applications`: Retrieves all applications for the currently authenticated user.
    -   `GET /api/all-applications`: An administrative endpoint to fetch all applications across all users, which could be used for processing and management.

### Frontend (`/frontend`)

The frontend is a modern Single-Page Application (SPA) built with React and Vite, providing a dynamic and responsive user experience.

-   **`main.jsx`**: The application's entry point. It sets up the `StrictMode` and wraps the entire `App` component with the `AuthProvider` to make authentication state available globally.

-   **`App.jsx`**: The root component that orchestrates the application's layout and routing. It uses `react-router-dom` to define the different pages (routes) of the application and manages the visibility of the main application organizer.

-   **State Management (`/auth/AuthContext.jsx`)**:
    -   The `AuthContext` is a React Context that provides a centralized way to manage authentication state throughout the application. It uses a `useReducer` hook to handle state transitions for login, logout, and authentication errors.
    -   The `AuthProvider` component contains the logic for checking the user's authentication status on initial load, as well as functions for `login`, `register`, and `logout`. It interacts with the backend API and stores the JWT in `localStorage` to persist the user's session.

-   **Routing and Protected Routes**:
    -   The application uses `react-router-dom` for client-side routing.
    -   `ProtectedRoute.jsx` is a key component that acts as a guard for routes that require authentication. It checks the `isAuthenticated` state from the `AuthContext` and redirects unauthenticated users to the login page.

-   **Application Form (`/application`)**:
    -   **`Organizer.jsx`**: This component is the "brain" of the multi-step application form. It manages the current step, holds the state for all form fields, and orchestrates the navigation between steps. A crucial feature is its use of `localStorage` to automatically save the user's progress, allowing them to resume their application later.
    -   **`/steps`**: This directory contains the individual components for each step of the application form:
        -   `BasicInformation.jsx`: A standard form for collecting textual data.
        -   `PersonalPhoto.jsx`: A complex component that uses the device's camera (`getUserMedia`) and `face-api.js` to capture and validate a user's photo in real-time. It provides feedback to the user to ensure their face is detected before allowing them to proceed.
        -   `PassportPhoto.jsx`: Similar to the personal photo step, but for capturing an image of the user's existing passport.
        -   `Signature.jsx`: Provides a canvas element for users to draw their signature, which is then converted to a Base64 image.
        -   `Location.jsx`: A form for capturing the user's location, with conditional logic to show either Sudanese states or a list of countries.

-   **User Dashboard (`/components/user-dashboard-list.jsx`)**:
    -   This component fetches and displays a list of the user's submitted applications from the `AuthContext`. It provides filtering options (e.g., by status) and presents the application data in a clear, tabular format.

### Database Schema (`userSchema.js`)

The application relies on a single MongoDB collection: `users`. The schema is designed to be user-centric, with each user document containing an array of their applications.

-   **`username`**: `String` (required, trimmed)
-   **`email`**: `String` (required, unique)
-   **`password`**: `String` (required)
-   **`applications`**: `Array` of `Object`s. This is an embedded array of documents, where each document represents a single passport renewal application. This design keeps all of a user's data together in one place.

Each object within the `applications` array has the following fields:

-   `accountID`: `String` - The `_id` of the parent user document.
-   `fullname`: `String`
-   `passportNo`: `String`
-   `nationalNo`: `String`
-   `birthPlace`: `String`
-   `birthday`: `String`
-   `personalPhoto`: `String` (A Base64 encoded string of the image)
-   `passportPhoto`: `String` (A Base64 encoded string of the image)
-   `signature`: `String` (A Base64 encoded string of the image)
-   `expiry`: `String`
-   `location`: `String`
-   `dateCreated`: `Date` - The timestamp of when the application was submitted.
-   `status`: `String` - The current status of the application (e.g., "pending", "approved", "rejected").
