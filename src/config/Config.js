import * as firebase from 'firebase';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage';

const firebaseConfig = {
    apiKey: "AIzaSyCEDKeVDSlL5monU7ppM0EN2dnnmGr1EWs",
    authDomain: "projeto-dw-10e4b.firebaseapp.com",
    projectId: "projeto-dw-10e4b",
    storageBucket: "projeto-dw-10e4b.appspot.com",
    messagingSenderId: "131677022349",
    appId: "1:131677022349:web:ae128a03c5853a13b0dac4",
    measurementId: "G-PKK4T9YT45"
};

firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const db = firebase.firestore();
const storage = firebase.storage();

export{auth, db, storage};