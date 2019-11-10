import withMainLayout from "../src/hocs/withMainLayout";
import { compose } from 'redux';
import { promotionActions } from "../src/redux/promotion/action";
import { menuActions } from "../src/redux/menu/action";
import HomeScreen from "../src/screens/Home";
import Head from 'next/head';
import { connect } from 'react-redux';
import { useEffect } from "react";
import withAuth from "../src/hocs/withAuth";

const Page = Screen => {
    const HomePage = props => {
        useEffect(() => {
            props.getPromotions();
            props.getMenus();
        }, [])
        return (<Screen {...props} />);
    }

    return connect(state => state.Promotion, { ...promotionActions, ...menuActions })(HomePage);
}

const HomePage = compose(Page, withMainLayout, withAuth);

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