import { initializeApp } from "firebase/app";
import {getFirestore} from "@firebase/firestore";
import {getAuth} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyABt0HYROhhog4AMZWxhSCCUJdNtcMcPdU",
  authDomain: "car-configuration-481af.firebaseapp.com",
  projectId: "car-configuration-481af",
  storageBucket: "car-configuration-481af.appspot.com",
  messagingSenderId: "642741426747",
  appId: "1:642741426747:web:d994a036afc620a04fda1e"
};

const app = initializeApp(firebaseConfig);
export const firestore = getFirestore(app);
export const auth = getAuth(app);