import React, { useState, useEffect } from 'react';
import { promotionActions } from '../redux/promotion/action';
import { connect } from 'react-redux';
import { uploadFile, removeFile } from '../lib/uploadFile';
import { Modal, Button } from 'antd';
import { menuActions } from '../redux/menu/action';

const UpdateFormModal = props => {

    const { type, data } = props;

    const [name, setName] = useState(data.name);
    const [description, setDescription] = useState(data.description);
    const [price, setPrice] = useState(data.price);
    const [imageUrl, setImageUrl] = useState(data.imageUrl);
    const [file, setFile] = useState();

    const [loading, setLoading] = useState(false);

    useEffect(() => {
        (name != data.name) && setName(data.name);
        (description != data.description) && setDescription(data.description);
        (price != data.price) && setPrice(data.price);
        (imageUrl != data.imageUrl) && setImageUrl(data.imageUrl);
        (file != data.file) && setFile(null);
    }, [data]);

    const handleSelectImage = e => {
        const file = e.target.files[0]
        const reader = new FileReader();


        reader.onload = (e) => {
            setImageUrl(e.target.result);
        }

        if (file) {
            reader.readAsDataURL(file);
            setFile(file);
            props.onChange && props.onChange('imageUrl', file);
        }
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        switch (name) {
            case 'name': setName(value); break;
            case 'description': setDescription(value); break;
            case 'price': setPrice(value); break;
            default: break;
        }
    }

    const update = async () => {
        setLoading(true);
        const dto = {
            id: data.id,
            name,
            description,
            price: +price,
            available: data.available
        }
        if (file) {
            const { downloadURL, imageName } = await uploadFile(file);
            setImageUrl(downloadURL);
            dto.imageUrl = downloadURL;
            dto.imageName = imageName;
        }

        if (type === 'Promotion') {
            props.updatePromotion(dto);
        } else {
            props.updateMenu(dto);
        }

        setLoading(false);
        props.onCancel && props.onCancel();
    }

    return (
        <Modal
            title={`Update ${type}`}
            onCancel={props.onCancel}
            visible={props.visible}
            footer={null}
        >
            <div className='container'>
                <label>
                    <h4>Name</h4>
                    <input name='name' type='text' placeholder={`${type} name`} value={name} onChange={handleChange} />
                </label>
                <label>
                    <h4>Description</h4>
                    <textarea name='description' type='text' placeholder={`${type} description`} rows={2} value={description} onChange={handleChange} />
                </label>
                <label>
                    <h4>Price</h4>
                    <input name='price' className='input-price' type='number' value={price} onChange={handleChange} /> Baht
                 </label>
                <label>
                    <div className='input-image-container'>
                        <img src={imageUrl} />
                        <input className='input-image' accept='image/*' type='file' onChange={handleSelectImage} />
                    </div>
                </label>
            </div>
            <div className='footer'>
                <div className='btn'>
                    <Button loading={loading} type='primary' size='small' onClick={update}>Confirm</Button>
                </div>
                <Button size='small' onClick={props.onCancel}>Cancel</Button>
            </div>
            <style jsx global>{`
                .ant-modal-body {
                    padding: 12px;
                }
            `}</style>
            <style jsx>{`
                .container {
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
                .footer {
                    display: flex;
                    border-top: 1px solid var(--gray-light2);
                    justify-content: flex-end;
                    align-items: center;
                    padding-top: 12px;
                }
                .btn {
                    margin-right: 5px;
                }
            `}</style>
        </Modal>

    )
}

export default connect(state => state.Promotion, { ...promotionActions, ...menuActions })(UpdateFormModal);