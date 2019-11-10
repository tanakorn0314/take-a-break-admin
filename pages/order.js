import withMainLayout from "../src/hocs/withMainLayout";
import { compose } from 'redux';
import OrderScreen from "../src/screens/Order";
import Head from 'next/head';
import { connect } from 'react-redux';
import { useEffect } from "react";
import withAuth from "../src/hocs/withAuth";
import { orderActions } from "../src/redux/order/action";

const Page = Screen => {
    const OrderPage = props => {
        useEffect(() => {
            props.getOrder();
        }, [])
        return (<Screen {...props} />);
    }

    return connect(state => state.Promotion, orderActions)(OrderPage);
}

const OrderPage = compose(Page, withMainLayout, withAuth);

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