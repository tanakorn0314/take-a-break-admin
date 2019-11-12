import React, { useState } from 'react';
import useFormInput from '../hook/useFormInput';
import { promotionActions } from '../redux/promotion/action';
import { connect } from 'react-redux';
import { uploadFile, removeFile } from '../lib/uploadFile';
import { Button } from 'antd';
import { menuActions } from '../redux/menu/action';

const CreateForm = props => {

    const { type } = props;

    const name = useFormInput('');
    const description = useFormInput('');
    const price = useFormInput(0);
    const [imageUrl, setImageUrl] = useState('/static/images/add_image.png');
    const [file, setFile] = useState();

    const [loading, setLoading] = useState(false);

    const disabled = name.value.length === 0 || !file;

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

    const handleCreate = async () => {
        if (loading) return;
        setLoading(true);

        const res = await uploadFile(file);
        const { downloadURL, imageName } = res;

        setImageUrl(downloadURL);

        const data = {
            name: name.value,
            description: description.value,
            price: +price.value,
            imageUrl: downloadURL,
            imageName,
            available: false
        }

        if (type === 'Promotion') {
            props.addPromotion(data);
        } else {
            props.addMenu(data);
        }

        setLoading(false);
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
                <Button type='primary' loading={loading} onClick={handleCreate} disabled={disabled}>Create</Button>
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

export default connect(state => state.Promotion, { ...promotionActions, ...menuActions })(CreateForm);