// For Firebase JS SDK v7.20.0 and later, measurementId is optional
import firebase from 'firebase';
import 'firebase/firestore';

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyAgd5hu5tpm_fENZnHPwVpuw0v3ZtC4wA8",
    authDomain: "quora-bb4ad.firebaseapp.com",
    projectId: "quora-bb4ad",
    storageBucket: "quora-bb4ad.appspot.com",
    messagingSenderId: "705644605906",
    appId: "1:705644605906:web:6ee6fbb1917f9097e6980b",
    measurementId: "G-7M9YXMC4ZZ"
  };

  const firebaseApp =firebase.initializeApp(firebaseConfig)

  const auth=firebase.auth()
  const provider=new firebase.auth.GoogleAuthProvider()
  const db = firebaseApp.firestore()

  export { auth , provider}
  export default db