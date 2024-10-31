
import { initializeApp } from "firebase/app";

import { getFirestore } from "@firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDBX3SK6K3EZv9t417WMJtDgfZo-IMn4fA",
  authDomain: "crud-fire-react-3d813.firebaseapp.com",
  projectId: "crud-fire-react-3d813",
  storageBucket: "crud-fire-react-3d813.appspot.com",
  messagingSenderId: "673307988576",
  appId: "1:673307988576:web:75c7e520a89e6a63476905",
  measurementId: "G-KQPSHC4N08"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)
