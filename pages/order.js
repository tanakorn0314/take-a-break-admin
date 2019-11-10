import withCustomerLayout from "../src/hocs/withCustomerLayout";
import { compose } from 'redux';
import { promotionActions } from "../src/redux/promotion/action";
import { menuActions } from "../src/redux/menu/action";
import OrderScreen from "../src/screens/Order";
import Head from 'next/head';
import { connect } from 'react-redux';
import { useEffect } from "react";
import withAuth from "../src/hocs/withAuth";

const Page = Screen => {
    const OrderPage = props => {
        useEffect(() => {
            props.getPromotions();
            props.getMenus();
        }, [])
        return (<Screen {...props} />);
    }

    return connect(state => state.Promotion, { ...promotionActions, ...menuActions })(OrderPage);
}

const OrderPage = compose(Page, withCustomerLayout, withAuth);

export default OrderPage(props => {
    return (
        <>
            <Head>
                <title>Order</title>
            </Head>
            <OrderScreen {...props} />
        </>
    )
})