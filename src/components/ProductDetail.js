import React from 'react';
import { Icon } from 'antd';

const ProductDetail = props => {
    const { type, data } = props;
    const { name, description, imageUrl, price } = data;
    return (
        <div className='content'>
            <img src={imageUrl} />
            <div className='info'>
                <h4>{type === 'Promotion' ? '<Promotion> ' : ''}{name}</h4>
                <p>{description}</p>
            </div>
            <div className='price'>
                <h4>{price}</h4>
                <p>
                    <Icon type='shopping-cart'/> 5
                </p>
            </div>
            <style jsx>{`
            .content {
                width: 100%;
                display: flex;
                margin-bottom: 8px;
            }
            img {
                width: 80px;
                height: 70px;
                border-radius: 8px;
                margin-right: 5px;
            }
            .info {
                flex: 1;
                margin-right: 40px;
            }
            .name-price {
                width: 100%;
                display: flex;
                justify-content: space-between;
            }
            .name-price h4 {
                flex: 1;
            }
            .price {
                display: flex;
                flex-direction: column;
                align-items: flex-end;
            }
            p {
                font-size: .9em;
                color: var(--gray-light);
            }
            .price .selected {
                color: #61D061;
            }
            `}</style>
        </div>
    )
}

export default ProductDetail;