
import { initializeApp } from "firebase/app";

import {getFirestore} from '@firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyDNaNkUiv6Ym6LxdnuPyaxAkVK6aT9FiC4",
  authDomain: "crud-fire-react-8ec85.firebaseapp.com",
  projectId: "crud-fire-react-8ec85",
  storageBucket: "crud-fire-react-8ec85.appspot.com",
  messagingSenderId: "50508999869",
  appId: "1:50508999869:web:2078dcb6149cdf40a95bd4"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);