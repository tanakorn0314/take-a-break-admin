import React, { useState } from 'react';
import Button from './Button';
import { Icon } from 'antd';

const Promotion = props => {
    const promotion = {
        name: 'kfc kfckfckasdasdasdaskdpsaodkpaskdpasokdpoakdp',
        description: 'fried chicken asdal;sdm;asmd;asdmlasmd;amd;amsd;lasm',
        price: 200,
        imageUrl: 'https://cdn.livekindly.co/wp-content/uploads/2018/05/vegan-plant-based-news-kfc-vegan-livekindly-1068x601.jpg',
    }

    const [available, setAvailable] = useState(true);

    const { name, description, price, imageUrl } = promotion;

    return (
        <div className='container'>
            <div className='content'>
                <img src={imageUrl} />
                <div className='info'>
                    <h4>{name}</h4>
                    <p>{description}</p>
                </div>
                <div className='price'>
                    <h4>{price}</h4>
                </div>
            </div>
            <div className='action'>
                <Button color={available ? 'green' : 'red'} icon={available ? 'check' : 'close'} onClick={() => setAvailable(!available)}>
                    {available ? 'Available' : 'Not available'}
                </Button>
                <div className='del-update'>
                    <span className='edit-icon'>
                        <Icon type='edit' />
                    </span>
                    <span className='delete-icon'>
                        <Icon type='delete' />
                    </span>
                </div>
            </div>
            <style jsx>{`
                .container {
                    width: 100%;
                    margin-bottom: 8px;
                    border-bottom: 1px solid var(--gray-light);
                }
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
                .action {
                    display: flex;
                    margin-bottom: 8px;
                    justify-content: space-between;
                }
                .edit-icon {
                    margin-right: 12px;
                    color: var(--blue);
                }
                .delete-icon {
                    color: var(--red);
                }
            `}</style>
        </div>
    )
}

export default Promotion;