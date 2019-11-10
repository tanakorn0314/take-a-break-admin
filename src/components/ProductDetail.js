import React from 'react';
import { Icon } from 'antd';

const ProductDetail = props => {
    const { type, data, count } = props;
    const { name, description, imageUrl, price } = data;

    const c = count || 0;

    const handleReduce = e => {
        e.stopPropagation();
        props.onReduce && props.onReduce();
    }

    return (
        <div className='content'>
            <img src={imageUrl} />
            <div className='info'>
                <h4>{type === 'Promotion' ? '<Promotion> ' : ''}{name}</h4>
                <p>{description}</p>
            </div>
            <div className={`price`} onClick={handleReduce}>
                <h4>{price}</h4>
                <p className={`${c > 0 ? 'selected' : ''}`}>
                    {c > 0 && <span> - </span>} <Icon type='shopping-cart' /> {c}
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
            .price .selected {
                color: #61D061;
            }
            p {
                font-size: .9em;
                color: var(--gray-light);
            }
            
            `}</style>
        </div>
    )
}

export default ProductDetail;