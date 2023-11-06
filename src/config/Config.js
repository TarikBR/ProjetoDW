import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
    apiKey: "AIzaSyCEDKeVDSlL5monU7ppM0EN2dnnmGr1EWs",
    authDomain: "projeto-dw-10e4b.firebaseapp.com",
    databaseURL: "https://projeto-dw-10e4b-default-rtdb.firebaseio.com",
    projectId: "projeto-dw-10e4b",
    storageBucket: "projeto-dw-10e4b.appspot.com",
    messagingSenderId: "131677022349",
    appId: "1:131677022349:web:ae128a03c5853a13b0dac4",
    measurementId: "G-PKK4T9YT45"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export { auth, db, storage };