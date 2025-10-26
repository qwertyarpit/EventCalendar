# Calendar App

A Google Calendar-like web application built with Next.js, Firebase Authentication, and React.

## Features

- Firebase Authentication with Email/Password and Google Sign-In
- Google Calendar-like interface
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

  
   ** Create .env.local File**

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
 

   **Enable Email/Password and Google Sign-In for Authentication**

  
3. Run the development server:

   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.



## Technologies Used

- **Next.js 14** - React framework with App Router
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **Firebase Authentication** - User authentication
- **date-fns** - Date manipulation

