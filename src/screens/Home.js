import React from 'react';
import { connect } from 'react-redux';
import CreateForm from '../components/CreateForm';
import Promotion from '../components/Promotion';

const HomeScreen = props => {

    const { promotions } = props

    return (
        <div className='container'>
            <h3>Promotion</h3>
            {
                promotions && promotions.sort((a, b) => b.available - a.available).map((promotion, index) => (
                    <Promotion key={index} data={promotion} />
                ))
            }

            <h3>Create Promotion</h3>
            <CreateForm type='Promotion' />


            <style jsx>{`
                .container {
                   padding: 12px;
                }
                h3 {
                    margin-bottom: 10px;
                }
            `}</style>
        </div>
    )
}

export default connect(state => state.Promotion)(HomeScreen);