import withMainLayout from "../src/hocs/withMainLayout";
import { compose } from 'redux';
import { promotionActions } from "../src/redux/promotion/action";
import HomeScreen from "../src/screens/Home";
import Head from 'next/head';
import { connect } from 'react-redux';
import { useEffect } from "react";

const Page = Screen => {
    const HomePage = props => {
        useEffect(() => {
            props.getPromotions();
        }, [])
        return (<Screen {...props} />);
    }

    return connect(state => state.Promotion, promotionActions)(HomePage);
}

const HomePage = compose(Page, withMainLayout);

export default HomePage(props => {
    return (
        <>
            <Head>
                <title>Home</title>
            </Head>
            <HomeScreen {...props} />
        </>
    )
})