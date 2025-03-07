import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from 'firebase/auth';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
	apiKey: import.meta.env.VITE_FIREBASE_API_KEY,          // Check API key
	authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,  // Check Auth Domain
	projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,    // Check Project ID
	storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,  // Check Storage Bucket
	messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,  // Check Messaging Sender ID
	appId: import.meta.env.VITE_FIREBASE_APP_ID,  // Check App ID
	measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID  // Optional
  };  

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const storage = getStorage(app);
const FirestoreDB = getFirestore(app);

export { FirestoreDB, auth, storage };
// export const url = "http://localhost:8001";
export default app;