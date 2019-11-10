import React from 'react';

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
            `}</style>
        </div>
    )
}

export default ProductDetail;