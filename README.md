# Calendar App

A Google Calendar-like web application built with Next.js, Firebase Authentication, and React.

## Features

- Firebase Authentication with Email/Password and Google Sign-In
- Google Calendar-like interface with month view
- Event creation, editing, and deletion
- In-memory event storage with localStorage persistence
- Responsive design with Tailwind CSS
- Protected routes (unauthenticated users cannot access calendar)

## Setup

1. Install dependencies:

   ```bash
   npm install
   ```

2. Set up Firebase:

   **Step 1: Create a Firebase Project**

   - Go to https://console.firebase.google.com/
   - Click "Add project" or "Create a project"
   - Enter a project name (e.g., "calendar-app")
   - Continue through the setup (you can skip Google Analytics if you want)
   - Click "Create project"

   **Step 2: Add a Web App**

   - In your Firebase project, click the Web icon (</>) or "Add app"
   - Register your app with a nickname (e.g., "calendar-web-app")
   - You can skip the Firebase Hosting setup for now
   - Click "Register app"

   **Step 3: Get Your Firebase Config**

   - Firebase will show you a config object like this:
     ```javascript
     const firebaseConfig = {
       apiKey: "AIza...",
       authDomain: "your-project.firebaseapp.com",
       projectId: "your-project-id",
       storageBucket: "your-project.appspot.com",
       messagingSenderId: "123456789",
       appId: "1:123456789:web:abc123",
     };
     ```
   - Copy these values

   **Step 4: Create .env.local File**

   - Navigate to the `calendar-app` directory
   - Create a file named `.env.local`
   - Add your Firebase credentials (replace the values with your actual config):
     ```bash
     NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key_here
     NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
     NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
     NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
     NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=123456789
     NEXT_PUBLIC_FIREBASE_APP_ID=1:123456789:web:abc123
     ```
   - **IMPORTANT:** Use the exact values from your Firebase config, including all quotes and special characters

   **Step 5: Enable Authentication**

   - In your Firebase Console, go to "Authentication" in the left sidebar
   - Click "Get started" if you haven't set up authentication yet
   - Go to the "Sign-in method" tab
   - Enable "Email/Password":
     - Click on "Email/Password"
     - Toggle "Enable" to ON
     - Click "Save"
   - Enable "Google Sign-In":
     - Click on "Google"
     - Toggle "Enable" to ON
     - Enter a support email (your email)
     - Click "Save"
     - Complete any OAuth consent screen setup if prompted

3. Run the development server:

   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Usage

1. **Authentication**:

   - Sign up or sign in using email/password or Google
   - Unauthenticated users are automatically redirected to the login page

2. **Calendar View**:

   - Navigate between months using the arrow buttons
   - Today's date is highlighted in blue
   - Click on any date to add an event

3. **Event Management**:

   - Click on a date to create a new event
   - Click on existing events to edit them
   - Events are stored in localStorage and persist between sessions
   - Events show time and title in the calendar grid

4. **Navigation**:
   - Use the "Add Event" button to quickly create an event for today
   - Sign out using the button in the top-right corner

## Project Structure

```
src/
├── app/
│   ├── calendar/          # Calendar page (protected)
│   ├── login/            # Login page
│   ├── signup/           # Signup page
│   ├── layout.tsx        # Root layout with providers
│   └── page.tsx          # Home page (redirects to login/calendar)
├── components/
│   ├── EventModal.tsx    # Event creation/editing modal
│   └── ProtectedRoute.tsx # Route protection component
├── contexts/
│   ├── AuthContext.tsx   # Firebase authentication context
│   └── EventContext.tsx  # Event management context
└── lib/
    └── firebase.ts       # Firebase configuration
```

## Technologies Used

- **Next.js 14** - React framework with App Router
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **Firebase Authentication** - User authentication
- **date-fns** - Date manipulation
- **lucide-react** - Icons
- **localStorage** - Event persistence
