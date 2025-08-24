import { initializeApp, getApp, getApps, type FirebaseApp } from 'firebase/app';
import { getFirestore, type Firestore } from 'firebase/firestore';


// This configuration has been populated with the credentials you provided.
const firebaseConfig = {
  apiKey: "AIzaSyC9L4KFXBAK1amdW6hbDPhGWKNcvd0Q9_o",
  authDomain: "testing-37378.firebaseapp.com",
  projectId: "testing-37378",
  storageBucket: "testing-37378.appspot.com",
  messagingSenderId: "312185560209",
  appId: "1:312185560209:web:4f33b34713ca2230897330"
};

// Function to check if the config is still using placeholder values
export const isFirebaseConfigured = () => {
    return Object.values(firebaseConfig).every(value => value && !value.startsWith('YOUR_'));
};

let app: FirebaseApp | null = null;
let db: Firestore | null = null;

// Initialize Firebase only if it's properly configured.
// This prevents Firebase errors on initial load if config is missing.
if (isFirebaseConfigured()) {
    // This ensures we don't initialize the app more than once
    app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);
    db = getFirestore(app);
} else {
    console.warn("Firebase is not configured. Please add your configuration to services/firebase.ts. The application will not function correctly.");
}


export { app, db };