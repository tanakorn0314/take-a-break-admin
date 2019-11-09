import React from 'react';
import globalStyles from '../styles/globalStyles';

const MainLayout = props => {
    return (
        <div className='container'>
            <div className='top-bar'>
                <div className='top-bar-content'>
                    <h4>Take A Break</h4>
                </div>
            </div>
            <div className='content'>
                {props.children}
            </div>
            <div className='bottom-bar'>

            </div>
            <style jsx global>{globalStyles}</style>
            <style jsx>{`
                .top-bar {
                    box-shadow: 1px 0 6px 1px rgba(0,0,0,0.15);
                    text-align: center;
                    padding: 10px;
                    background-color: var(--yellow-light);
                }
                .top-bar {

                }
                .bottom-bar {

                }
             `}</style>
        </div>
    )
}

export default MainLayout;