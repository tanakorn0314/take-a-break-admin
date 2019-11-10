import withMainLayout from "../src/hocs/withMainLayout";
import { compose } from 'redux';
import { promotionActions } from "../src/redux/promotion/action";
import { menuActions } from "../src/redux/menu/action";
import ManageScreen from "../src/screens/Manage";
import Head from 'next/head';
import { connect } from 'react-redux';
import { useEffect } from "react";
import withAuth from "../src/hocs/withAuth";

const Page = Screen => {
    const ManagePage = props => {
        useEffect(() => {
            props.getPromotions();
            props.getMenus();
        }, [])
        return (<Screen {...props} />);
    }

    return connect(state => state.Promotion, { ...promotionActions, ...menuActions })(ManagePage);
}

const ManagePage = compose(Page, withMainLayout, withAuth);

export default ManagePage(props => {
    return (
        <>
            <Head>
                <title>Manage</title>
            </Head>
            <ManageScreen {...props} />
        </>
    )
})