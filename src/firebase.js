import firebase from 'firebase'

const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyB4hKDZW4X7YFXTTe8U1Ik2zW4Rqd9PwNM",
    authDomain: "nala-ba306.firebaseapp.com",
    databaseURL: "https://nala-ba306.firebaseio.com",
    projectId: "nala-ba306",
    storageBucket: "nala-ba306.appspot.com",
    messagingSenderId: "313743478107",
    appId: "1:313743478107:web:d54ab47ef6aefe83679e7e",
    measurementId: "G-32ZKM3YZSC"
})

const db = firebaseApp.firestore()
const auth = firebaseApp.auth()

export {db, auth}