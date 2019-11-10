import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Pagination, Icon, notification } from 'antd';
import Product from '../components/Product';
import ConfirmOrderModal from '../components/ConfirmOrderModal';

const PAGE_SIZE = 5;

const OrderScreen = props => {

    const { promotions, menus } = props;
    const [promotionPage, setPromotionPage] = useState(1);
    const [menuPage, setMenuPage] = useState(1);
    const [visible, setVisible] = useState(false);

    const [order, setOrder] = useState({});

    const totalCount = Object.values(order).reduce((prev, cur) => prev + cur.count, 0);
    const totalPrice = Object.values(order).reduce((prev, cur) => prev + cur.price, 0);

    const addOrder = (key, value) => {
        // console.log(key, value);
        if (!order[key]) {
            setOrder({ ...order, [key]: { count: 1, price: value.price, data: value } })
        } else {
            setOrder({ ...order, [key]: { count: order[key].count + 1, price: order[key].price + value.price, data: value } })
        }
    }

    const reduceOrder = (key, value) => {
        if (order[key] && order[key].count > 0) {
            setOrder({ ...order, [key]: { count: order[key].count - 1, price: order[key].price - value.price, data: value } })
        } 
    }

    const renderPromotions = () => {
        if (!promotions || promotions.length === 0)
            return <div></div>

        const start = (promotionPage - 1) * PAGE_SIZE;
        const end = (promotionPage) * PAGE_SIZE;

        return (
            <div className='list'>
                {
                    promotions.filter(promotion => promotion.available).slice(start, end).map((promotion, index) => (
                        <Product
                            key={index}
                            data={promotion}
                            type='Promotion'
                            onClick={() => { addOrder(`promotion-${start+index}`, promotion) }}
                            onReduce={() => { reduceOrder(`promotion-${start+index}`, promotion) }}
                            count={order[`promotion-${start+index}`] ? order[`promotion-${start+index}`].count : 0}
                        />
                    ))
                }
                {
                    promotions.length > PAGE_SIZE && (
                        <Pagination size='small' onChange={(p) => setPromotionPage(p)} current={promotionPage} total={promotions.length} pageSize={PAGE_SIZE} />

                    )
                }
            </div>
        )
    }

    const renderMenus = () => {
        if (!menus)
            return (<Icon type='loading' />);
        else if (menus.length === 0)
            return <div>Sorry, no currently available menu</div>

        const start = (menuPage - 1) * PAGE_SIZE;
        const end = (menuPage) * PAGE_SIZE;

        return (
            <div className='list'>
                {
                    menus.filter(menu => menu.available).slice(start, end).map((menu, index) => (
                        <Product
                            key={index}
                            data={menu}
                            type='Menu'
                            onClick={() => { addOrder(`menu-${start+index}`, menu) }}
                            onReduce={() => { reduceOrder(`menu-${start+index}`, menu) }}
                            count={order[`menu-${start+index}`] ? order[`menu-${start+index}`].count : 0}
                        />
                    ))
                }
                {
                    menus.length > PAGE_SIZE && (
                        <Pagination size='small' onChange={(p) => setMenuPage(p)} current={menuPage} total={menus.length} pageSize={PAGE_SIZE} />
                    )
                }
            </div>
        )
    }

    const handleCreateOrder = () => {
        setVisible(false);
        notification['success']({
            message: 'Success',
            description: 'Your order is created',
            duration: 2
        })
    }

    return (
        <div className='container'>
            <div className='content'>
                {
                    promotions && promotions.length > 0 && (
                        <h3>Promotions</h3>
                    )
                }
                {renderPromotions()}
                <h3>Menus</h3>
                {renderMenus()}
            </div>
            {
                totalCount > 0 && (
                    <>
                        <div className='order-tab'  onClick={() => setVisible(true)}>
                            <div className='order-button'>
                                <div className='left'>
                                    <h4>Order</h4>
                                    <p>{totalCount} Items</p>
                                </div>
                                <div className='right'>
                                    <h4>฿{totalPrice}</h4>
                                </div>
                            </div>
                        </div>
                        <div className='space' />
                    </>
                )
            }
            <ConfirmOrderModal visible={visible} onCancel={() => setVisible(false)} order={order} onCreateOrder={handleCreateOrder}/>
            <style jsx>{`
                .content {
                    padding: 10px;
                }
                :global(.list) {
                    display: flex;
                    flex-direction: column;
                    align-items: flex-end;
                }
                .space {
                    height: 60px;
                }
                .order-tab {
                    position: fixed;
                    left: 0;
                    right: 0;
                    bottom: 0;
                    background-color: white;
                    height: 60px;
                    padding: 10px;
                    box-shadow: 0 -1px 6px 1px rgba(0, 0, 0, .15);
                }
                .order-button {
                    border-radius: 5px;
                    background-color: #61D061;
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    padding: 8px;
                }
                .order-button:hover {
                    background-color: #50A850;
                }
                .left {
                    display: flex;
                    align-items: center;
                }
                .left h4 {
                    margin-right: 10px;
                    color: white;
                }
                .left p, .right h4 {
                    color: white;
                }

            `}</style>
        </div>
    )
}

export default connect(state => ({ ...state.Promotion, ...state.Menu }))(OrderScreen);