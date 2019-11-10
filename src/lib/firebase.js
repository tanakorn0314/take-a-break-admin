import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage';
import { firebaseConfig } from '../config';

function getFirebase() {
    try {
        firebase.initializeApp(firebaseConfig);
        firebase.firestore().enablePersistence()
    } catch (e) {
        // console.error(e);
    } finally {
        return {
            auth: firebase.auth(),
            db: firebase.firestore(),
            storage: firebase.storage()
        }
    }
}

export default getFirebase;
