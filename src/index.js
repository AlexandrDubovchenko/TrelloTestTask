import { Trello } from './Trello.js';
var firebaseConfig = {
  apiKey: "AIzaSyA0Cd9l8A4Hn-pSXCCrNMaXsqvMxXEj9o4",
  authDomain: "trellotesttask.firebaseapp.com",
  databaseURL: "https://trellotesttask.firebaseio.com",
  projectId: "trellotesttask",
  storageBucket: "trellotesttask.appspot.com",
  messagingSenderId: "757460910034",
  appId: "1:757460910034:web:d27942580bded4d9d4120b"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
var db = firebase.firestore();
const tasks = [];
db.collection("tasks").get().then((querySnapshot) => {
  querySnapshot.forEach((doc) => {
    tasks.push({ id: doc.id, ...doc.data() });
  });
  const trello = new Trello(db, tasks);
  trello.init();
});
