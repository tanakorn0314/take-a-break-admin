import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Pagination, Icon, notification } from 'antd';
import Product from '../components/Product';
import ConfirmOrderModal from '../components/ConfirmOrderModal';
import moment from 'moment';
import Button from '../components/Button';

const PAGE_SIZE = 5;

const OrderScreen = props => {

    const { orders } = props;
    const [page, setPage] = useState(1);
    // const [visible, setVisible] = useState(false);

    const renderOrders = () => {
        if (!orders)
            return <Icon type='loading' />

        else if (orders.length === 0)
            return <div>--- No Order ---</div>

        const start = (page - 1) * PAGE_SIZE;
        const end = (page) * PAGE_SIZE;

        return (
            <div className='list'>
                {
                    orders.sort((a, b) => a.timestamp.toDate() - b.timestamp.toDate()).slice(start, end).map((orderData, index) => (
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
                                                <Button color='green' size='small' icon='check'>Accept</Button>
                                            </div>
                                            <Button color='red' size='small' icon='close'>Cancel</Button>
                                        </td>
                                        <td><p>total</p></td>
                                        <td><h4>฿ {orderData.order.reduce((prev, cur) => prev + cur.price, 0)}</h4></td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    ))
                }
                {
                    orders.length > PAGE_SIZE && (
                        <Pagination size='small' onChange={(p) => setPage(p)} current={page} total={orders.length} pageSize={PAGE_SIZE} />
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
                
            `}</style>
        </div>
    )
}

export default connect(state => state.Order)(OrderScreen);