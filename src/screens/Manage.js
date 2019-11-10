import React, { useState } from 'react';
import { connect } from 'react-redux';
import CreateForm from '../components/CreateForm';
import Product from '../components/Product';
import { Tabs, Icon, Pagination } from 'antd';
import { promotionActions } from '../redux/promotion/action';
import { menuActions } from '../redux/menu/action';

const { TabPane } = Tabs;

const PAGE_SIZE = 5;

const ManageScreen = props => {

    const { promotions, menus } = props;

    const [current, setCurrent] = useState('promotion');

    const [promotionPage, setPromotionPage] = useState(1);
    const [menuPage, setMenuPage] = useState(1);

    const renderPromotions = () => {
        if (!promotions)
            return (<Icon type='loading' />);

        else if (promotions.length === 0)
            return <div>---- No promotions ----</div>

        const start = (promotionPage - 1) * PAGE_SIZE;
        const end = (promotionPage) * PAGE_SIZE;

        if (promotions.length <= start)
            setPromotionPage(Math.floor((promotions.length) / PAGE_SIZE));

        return (
            <div className='list'>
                {
                    promotions.sort((a, b) => b.available - a.available).slice(start, end).map((promotion, index) => (
                        <Product
                            key={index}
                            data={promotion}
                            editable
                            onChange={(data) => props.updatePromotion(data)}
                            onDelete={(id) => props.deletePromotion(id)}
                            type='Promotion'
                        />
                    ))
                }
                <Pagination size='small' onChange={(p) => setPromotionPage(p)} current={promotionPage} total={promotions.length} pageSize={PAGE_SIZE} />
            </div>
        )
    }

    const renderMenus = () => {
        if (!menus)
            return (<Icon type='loading' />);
        else if (menus.length === 0)
            return <div>---- No menus ----</div>

        const start = (menuPage - 1) * PAGE_SIZE;
        const end = (menuPage) * PAGE_SIZE;

        if (menus.length <= start)
            setMenuPage(Math.floor((menus.length) / PAGE_SIZE));

        return (
            <div className='list'>
                {
                    menus.sort((a, b) => b.available - a.available).slice(start, end).map((menu, index) => (
                        <Product
                            key={index}
                            data={menu}
                            editable
                            onChange={(data) => props.updateMenu(data)}
                            onDelete={(id) => props.deleteMenu(id)}
                            type='Menu'
                        />
                    ))
                }
                <Pagination size='small' onChange={(p) => setMenuPage(p)} current={menuPage} total={menus.length} pageSize={PAGE_SIZE} />
            </div>
        )
    }

    return (
        <div className='container'>
            <Tabs activeKey={current} onChange={(tab) => setCurrent(tab)}>
                <TabPane key='promotion' tab='Promotions'>
                    {renderPromotions()}
                    <h3>Create Promotion</h3>
                    <CreateForm type='Promotion' />
                </TabPane>
                <TabPane key='menu' tab='Menu'>
                    {renderMenus()}
                    <h3>Create Menu</h3>
                    <CreateForm type='Menu' />
                </TabPane>
            </Tabs>
            <style jsx>{`
                .container {
                   padding: 0 12px 0 12px;
                }
                h3 {
                    margin-bottom: 10px;
                }
                :global(.list) {
                    display: flex;
                    flex-direction: column;
                    align-items: flex-end;
                }
            `}</style>
        </div>
    )
}

export default connect(state => ({ ...state.Promotion, ...state.Menu }), { ...promotionActions, ...menuActions })(ManageScreen);