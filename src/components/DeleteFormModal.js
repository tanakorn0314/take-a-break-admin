import React, { useState } from 'react';
import { promotionActions } from '../redux/promotion/action';
import { connect } from 'react-redux';
import { Modal, Button } from 'antd';
import { removeFile } from '../lib/uploadFile';
import { menuActions } from '../redux/menu/action';

const DeleteFormModal = props => {

    const { type, data } = props;

    const [loading, setLoading] = useState(false);

    const handleDelete = () => {
        setLoading(true);
        if (type === 'Promotion') {
            props.deletePromotion(data.id);
        } else {
            props.deleteMenu(data.id);
        }
        removeFile(data.imageName);
        props.onCancel();
        setLoading(false);
    }

    return (
        <Modal
            title={`Delete ${type}`}
            onCancel={props.onCancel}
            visible={props.visible}
            footer={null}
        >
            <p className='body'>
                Are you sure to delete this {type.toLowerCase()}
            </p>
            <div className='footer'>
                <div className='btn'>
                    <Button loading={loading} type='primary' size='small' onClick={handleDelete}>Confirm</Button>
                </div>
                <Button size='small' onClick={props.onCancel}>Cancel</Button>
            </div>
            <style jsx global>{`
                .ant-modal-body {
                    padding: 12px;
                }
            `}</style>
            <style jsx>{`
                .body {
                    margin-bottom: 12px;
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

export default connect(state => state.Promotion, { ...promotionActions, ...menuActions })(DeleteFormModal);