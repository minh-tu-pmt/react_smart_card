import { initializeApp, getApps } from 'firebase/app';
import { getDatabase, ref, push, onValue, set } from 'firebase/database';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: 'AIzaSyCE9fEajl4WF_Cxl8Fwn_LeTeQeUiIMw1c',
    authDomain: 'smart-card-visit.firebaseapp.com',
    databaseURL: 'https://smart-card-visit-default-rtdb.asia-southeast1.firebasedatabase.app',
    projectId: 'smart-card-visit',
    storageBucket: 'smart-card-visit.appspot.com',
    messagingSenderId: '291836209337',
    appId: '1:291836209337:web:1d9d4a1bd7a02ccc9d5368',
    measurementId: 'G-E0R15PXEJ1'
};

const app = getApps().length ? getApps() : initializeApp(firebaseConfig);
const database = getFirestore(app);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { database, ref, push, onValue, set, auth, provider };
