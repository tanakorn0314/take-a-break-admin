import getFirebase from "./firebase";
import firebase from 'firebase/app';

const randomName = () => {
    const s1 = Math.random().toString(16).substr(2, 10);
    const s2 = Math.random().toString(32).substr(2, 10);
    const s3 = new Date().toISOString().replace('.', '-').replace(':', '-');
    return s1 + s2 + '_' + s3;
}

export const uploadFile = (file, onProgress = null, onError = null) => {
    return new Promise((resolve, reject) => {
        let { storage } = getFirebase();
        const imageName = randomName();
        let storageRef = storage.ref().child(imageName);
        let uploadTask = storageRef.put(file);

        uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED, (snapshot) => {
            let progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            onProgress && onProgress(progress);
        }, (e) => {
            onError && onError(e);
        }, () => {
            uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
                resolve({ downloadURL, imageName });
            });
        })
    })

}

export const removeFile = (fileName) => {
    let { storage } = getFirebase();
    let storageRef = storage.ref().child(fileName);
    return storageRef.delete();
}