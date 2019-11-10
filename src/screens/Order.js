import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Pagination, Icon } from 'antd';
import moment from 'moment';
import Button from '../components/Button';
import DeleteFormModal from '../components/DeleteFormModal';

const PAGE_SIZE = 5;

const OrderScreen = props => {

    const { orders } = props;
    const [page, setPage] = useState(1);
    const [visible, setVisible] = useState(false);

    const acceptOrder = (data) => {
        props.updateOrder({ ...data, status: 'accepted' });
    }

    const renderOrders = () => {
        if (!orders)
            return <Icon type='loading' />

        const start = (page - 1) * PAGE_SIZE;
        const end = (page) * PAGE_SIZE;

        const filteredOrders = orders.filter((orderData) => !orderData.status)
            .sort((a, b) => a.timestamp.toDate() - b.timestamp.toDate())

        if (filteredOrders.length === 0)
            return <div>--- No Order ---</div>;

        if (filteredOrders.length <= start)
            setPage(Math.floor((filteredOrders.length) / PAGE_SIZE));

        return (
            <div className='list'>
                <div>
                    {
                        filteredOrders.slice(start, end).map((orderData, index) => (
                            <div key={index} className='order-container'>
                                <h4>{orderData.customerName} <span className='time'>({moment(orderData.timestamp.toDate().toString()).fromNow()})</span></h4>
                                <table>
                                    <colgroup>
                                        <col width='500px' />
                                        <col width='100px' />
                                        <col width='100px' />
                                    </colgroup>
                                    <tbody>
                                        {
                                            orderData.order.map((o, i) => (
                                                <tr key={i}>
                                                    <td className='first-col'><p>{o.data.name}</p></td>
                                                    <td><p>{o.count}</p></td>
                                                    <td><h4>{o.price}</h4></td>
                                                </tr>
                                            ))
                                        }
                                        <tr>
                                            <td className='first-col btn-container'>
                                                <div className='left'>
                                                    <Button color='green' size='small' icon='check' onClick={() => acceptOrder(orderData)}>Accept</Button>
                                                </div>
                                                <Button color='red' size='small' icon='close' onClick={() => setVisible(true)}>Cancel</Button>
                                            </td>
                                            <td><p>total</p></td>
                                            <td><h4>฿ {orderData.order.reduce((prev, cur) => prev + cur.price, 0)}</h4></td>
                                        </tr>
                                    </tbody>
                                </table>
                                <DeleteFormModal
                                    type='Order'
                                    data={orderData}
                                    visible={visible}
                                    onCancel={() => setVisible(false)}
                                />
                            </div>
                        ))
                    }
                </div>
                {
                    filteredOrders.length > PAGE_SIZE && (
                        <Pagination size='small' onChange={(p) => setPage(p)} current={page} total={filteredOrders.length} pageSize={PAGE_SIZE} />
                    )
                }
            </div>
        )
    }


    return (
        <div className='container'>
            <h3>Waiting Order</h3>
            {renderOrders()}
            <style jsx>{`
                .container {
                    padding: 10px;
                }
                h3 {
                    margin-bottom: 8px;
                }
                :global(.order-container) {
                    padding-bottom: 8px;
                    margin-bottom: 8px;
                    border-bottom: 1px solid var(--gray-light2);
                }
                :global(.order-info) {
                    display: flex;
                }
                :global(.first-col) {
                    text-align: left;
                }
                :global(td) {
                    text-align: right;
                }
                :global(.time) {
                    font-size: .8em;
                    font-weight: 200;
                }
                :global(.btn-container) {
                    display: flex;
                }
                :global(.btn-container .left) {
                    margin-right: 4px;
                }
                :global(.list) {
                    display: flex;
                    align-items: flex-end;
                    flex-direction: column;
                }
            `}</style>
        </div>
    )
}

export default connect(state => state.Order)(OrderScreen);