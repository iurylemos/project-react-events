//Amazenar as configurações com o firebase, storage, authentication..

import firebase from 'firebase/app';

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAtoI_amHi9LRftQfsh7pscUR4k47qMmlE",
    authDomain: "eventos-react-89138.firebaseapp.com",
    databaseURL: "https://eventos-react-89138.firebaseio.com",
    projectId: "eventos-react-89138",
    storageBucket: "eventos-react-89138.appspot.com",
    messagingSenderId: "333080111068",
    appId: "1:333080111068:web:5d8263d32bccad18fd1119"
};
// Initialize Firebase
export default firebase.initializeApp(firebaseConfig);