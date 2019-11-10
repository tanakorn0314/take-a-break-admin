import React, { useState } from 'react';
import { Modal, Icon } from 'antd';
import { connect } from 'react-redux';
import useFormInput from '../hook/useFormInput';
import { orderActions } from '../redux/order/action';

const ConfirmOrderModal = props => {

    const { order } = props;
    const [loading, setLoading] = useState(false);
    const customerName = useFormInput('');

    const totalCount = Object.values(order).reduce((prev, cur) => prev + cur.count, 0);
    const totalPrice = Object.values(order).reduce((prev, cur) => prev + cur.price, 0);

    const disabled = customerName.value.length <= 0;

    const createOrder = async () => {
        if (disabled) return;
        setLoading(true);

        const data = {
            customerName: customerName.value,
            order: Object.values(order),
            timestamp: new Date()
        }

        try {
            await props.addOrder(data);

            setLoading(false);
            props.onCreateOrder();
        } catch (e) {
            console.log(e);
        }

    }

    return (
        <Modal
            title='Confirm Your Order'
            onCancel={props.onCancel}
            visible={props.visible}
            footer={null}
        >
            <div className='container'>
                {
                    Object.entries(order).map((o, index) => {
                        const [k, v] = o;
                        const type = k.split('-')[0];
                        return (
                            <div className='order' key={index}>
                                <div className='left'>
                                    {type === 'promotion' ? '<Promotion> ' : ''} {v.data.name}
                                </div>
                                <div className='right'>
                                    <p>{v.count}</p>
                                    <p>฿{v.price}</p>
                                </div>
                            </div>
                        )
                    })
                }
                <div className='summary'>
                    <p className='right'>{totalCount} Item{totalCount > 1 ? 's' : ''}</p>
                    <h4 className='sum'>
                        <span>Total</span>
                        <span>฿ {totalPrice}</span>
                    </h4>
                </div>
                <input type='text' placeholder='Enter Your Name' {...customerName} />
                <div className={`button ${disabled ? 'disabled' : ''}`} disabled={disabled} onClick={createOrder}>
                    {loading ? <Icon type='loading' /> : 'Confirm'}
                </div>
            </div>
            <style jsx global>{`
                .ant-modal-body, .ant-modal-header {
                    padding: 12px;
                }
            `}</style>
            <style jsx>{`
                .order {
                    display: flex;
                    justify-content: space-between;
                    border-bottom: 1px solid var(--gray-light2);
                    padding-bottom: 8px;
                    margin-bottom: 8px;
                }
                .left {
                    flex: 1;
                    margin-right: 8px;
                }
                .right {
                    text-align: right;
                }
                .summary {
                    margin-bottom: 8px;
                }
                .sum {
                    display: flex;
                    justify-content: space-between;
                }
                input {
                    border: 1px solid var(--gray-light);
                    border-radius: 4px;
                    width: 100%;
                    padding: 4px;
                    margin-bottom: 10px;
                }
                .button {
                    border-radius: 5px;
                    background-color: #61D061;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    color: white;
                    padding: 8px;
                    height: 36px;
                }
                .button.disabled {
                    background-color: var(--gray-light);
                }
            `}</style>
        </Modal>
    )
}

export default connect(state => ({ ...state.Promotion, ...state.Menu }), orderActions)(ConfirmOrderModal);