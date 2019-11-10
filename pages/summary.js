import withMainLayout from "../src/hocs/withMainLayout";
import { compose } from 'redux';
import SummaryScreen from "../src/screens/Summary";
import Head from 'next/head';
import { connect } from 'react-redux';
import { useEffect } from "react";
import withAuth from "../src/hocs/withAuth";
import { orderActions } from "../src/redux/order/action";

const Page = Screen => {
    const SummaryPage = props => {
        useEffect(() => {
            props.getOrder();
        }, [])
        return (<Screen {...props} />);
    }

    return connect(state => state.Promotion, orderActions)(SummaryPage);
}

const SummaryPage = compose(Page, withMainLayout, withAuth);

export default SummaryPage(props => {
    return (
        <>
            <Head>
                <title>Summary</title>
            </Head>
            <SummaryScreen {...props} />
        </>
    )
})