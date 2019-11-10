import React, { useState } from 'react';
import globalStyles from '../styles/globalStyles';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Icon } from 'antd';

const MainLayout = props => {

    const router = useRouter();
    const path = router.pathname.substr(1, router.pathname.length);

    return (
        <div className='container'>
            <div className='main-content'>
                <div className='top-bar'>
                    <div className='top-bar-content'>
                        <h2>TAKE A BREAK</h2>
                    </div>
                </div>
                <div className='content'>
                    {props.children}
                </div>
            </div>
            <div className='bottom-bar'>
                <Link href='/order'>
                    <a className={`link ${path === 'order' ? 'selected' : ''}`}>
                        <Icon type='form' />
                        <p>Order</p>
                    </a>
                </Link>
                <Link href='/summary'>
                    <a className={`link ${path === 'summary' ? 'selected' : ''}`}>
                        <Icon type='stock' />
                        <p>Summary</p>
                    </a>
                </Link>
                <Link href='/manage'>
                    <a className={`link ${path === 'manage' ? 'selected' : ''}`}>
                        <Icon type='setting' />
                        <p>Manage</p>
                    </a>
                </Link>
            </div>
            <style jsx global>{globalStyles}</style>
            <style jsx>{`
                .main-content {
                    position: absolute;
                    top: 0;
                    left: 0;
                    right: 0;
                    bottom: 48px;
                    overflow-y: auto;
                }
                .top-bar {
                    box-shadow: 1px 0 6px 1px rgba(0,0,0,0.15);
                    text-align: center;
                    padding: 10px;
                    background-color: var(--yellow-light);
                }
                .content {
                    min-height: calc(100vh);
                    padding-bottom: 10px;
                }
                .bottom-bar {
                    box-shadow: 0px -1px 6px 1px rgba(0,0,0,0.15);
                    padding: 10px;
                    display: flex;
                    align-items: center;
                    justify-content: space-around;
                    position: fixed;
                    bottom: 0;
                    left: 0;
                    right: 0;
                    height: 48px;
                    z-index: 1000;
                    background-color: white;
                }
                .link {
                    cursor: pointer;
                    display: inline-flex;
                    flex-direction: column;
                    align-items: center;
                    color: var(--gray);
                }
                .link.selected, .link.selected p  {
                    color: var(--blue);
                }

             `}</style>
        </div>
    )
}

export default MainLayout;