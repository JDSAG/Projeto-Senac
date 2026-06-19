import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

const firebaseConfig = {
    apiKey: "AIzaSyCyEVvGqm1xgtGafdWiHkGuGBXkuibn4iI",
    authDomain: "projeto-cardapio-c8747.firebaseapp.com",
    projectId: "projeto-cardapio-c8747",
    storageBucket: "projeto-cardapio-c8747.firebasestorage.app",
    messagingSenderId: "534647064897",
    appId: "1:534647064897:web:4a4bad392d50ad1763f9c0"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);