import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/storage';
import { firebaseConfig } from '../config';

function getDB() {
    try {
        firebase.initializeApp(firebaseConfig);
    } catch (e) {
        // console.error(e);
    } finally {
        return {
            db: firebase.firestore(),
            storage: firebase.storage()
        }
    }
}

export default getDB;
