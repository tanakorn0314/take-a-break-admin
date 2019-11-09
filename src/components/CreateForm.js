import React, { useState } from 'react';
import useFormInput from '../hook/useFormInput';
import Button from '../components/Button';
import getDB from '../lib/db';
import firebase from 'firebase/app';
import { promotionActions } from '../redux/promotion/action';
import { connect } from 'react-redux';

const CreateForm = props => {

    const { db, storage } = getDB();
    const { type } = props;

    const name = useFormInput('');
    const description = useFormInput('');
    const price = useFormInput(0);
    const [imageUrl, setImageUrl] = useState('/static/images/add_image.png');
    const [file, setFile] = useState();

    const handleSelectImage = e => {
        const file = e.target.files[0]
        const reader = new FileReader();

        setFile(file);

        reader.onload = (e) => {
            setImageUrl(e.target.result);
        }

        if (file) {
            reader.readAsDataURL(file);
        }
    }

    const handleCreate = () => {
        props.addPromotion({
            name: name.value,
            description: description.value,
            price: price.value,
            imageUrl: imageUrl,
            available: false
        })
        // let storageRef = storage.ref().child('/test');
        // let uploadTask = storageRef.put(file);

        // uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED, (snapshot) => {
        //     let progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        //     console.log('Upload is ' + progress + '% done');
        //     switch (snapshot.state) {
        //         case firebase.storage.TaskState.PAUSED: // or 'paused'
        //             console.log('Upload is paused');
        //             break;
        //         case firebase.storage.TaskState.RUNNING: // or 'running'
        //             console.log('Upload is running');
        //             break;
        //     }
        // }, (error) => {
        //     switch (error.code) {
        //         case 'storage/unauthorized':
        //             console.log(`User doesn't have permission to access the object`);
        //             break;
        //         case 'storage/canceled':
        //             console.log(`User canceled the upload`)
        //             break;
        //         case 'storage/unknown':
        //             console.log(`Unknown error occurred, inspect error.serverResponse`)
        //             break;
        //     }
        // }, () => {
        //     uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
        //         setImageUrl(downloadURL);
        //         db.collection(type.toLowerCase()).add({
        //             name: name.value,
        //             description: description.value,
        //             price: price.value,
        //             imageUrl: downloadURL,
        //             available: false
        //         }).then((ref) => {
        //             console.log(ref)
        //         }).catch(e => {
        //             console.error(e);
        //         })
        //     });
        // })


    }

    return (
        <div className='container'>
            <label>
                <h4>Name</h4>
                <input type='text' placeholder={`${type} name`} {...name} />
            </label>
            <label>
                <h4>Description</h4>
                <textarea type='text' placeholder={`${type} description`} rows={2} {...description} />
            </label>
            <label>
                <h4>Price</h4>
                <input className='input-price' type='number' {...price} /> Baht
            </label>
            <label>
                <div className='input-image-container'>
                    <img src={imageUrl} />
                    <input className='input-image' accept='image/*' type='file' onChange={handleSelectImage} />
                </div>
            </label>
            <div>
                <Button color='blue' onClick={handleCreate}>Create</Button>
            </div>
            <style jsx>{`
                .container {
                    padding: 8px;
                    border: 1px solid var(--gray-light);
                    border-radius: 4px;
                    max-width: 400px;
                }
                input, textarea {
                    border: 1px solid var(--gray-light);
                    border-radius: 4px;
                    padding: 4px;
                    margin-bottom: 6px;
                    width: 100%;
                }
                .input-price {
                    max-width: 80px;
                }
                .input-image-container {
                    margin-bottom: 6px;
                }
                .input-image {
                    display: none;
                }
                img {
                    width: 80px;
                    max-height: 80px;
                    border-radius: 10px;
                    pointer: cursor;
                }
            `}</style>
        </div>
    )
}

export default connect(state => state.Promotion, promotionActions)(CreateForm);