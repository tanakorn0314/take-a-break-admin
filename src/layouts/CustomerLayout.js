import React from 'react';
import globalStyles from '../styles/globalStyles';

const CustomerLayout = props => {

    return (
        <div className='container'>
            <div className='top-bar'>
                <div className='top-bar-content'>
                    <h2>TAKE A BREAK</h2>
                </div>
            </div>
            <div className='content'>
                {props.children}
            </div>
            <style jsx global>{globalStyles}</style>
            <style jsx>{`
                .top-bar {
                    box-shadow: 1px 0 6px 1px rgba(0,0,0,0.15);
                    text-align: center;
                    padding: 10px;
                    background-color: var(--yellow-light);
                }
                .content {
                    min-height: calc(100vh);
                }
             `}</style>
        </div>
    )
}

export default CustomerLayout;