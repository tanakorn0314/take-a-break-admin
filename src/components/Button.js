import React from 'react';
import { Icon } from 'antd';

const Button = props => {
    return (
        <button {...props} className={`${props.className ? props.className : ''} ${props.color} ${props.size ? ` ${props.size}` : ''}`}>
            {
                props.icon && (
                    <span className='icon'>
                        <Icon type={props.icon} />
                    </span>
                )
            }
            {props.children}
            <style jsx>{`
                button {
                    border-radius: 4px;
                    padding: 2px 10px;
                    cursor: pointer;
                    transition: color 0.1s ease-in-out;

                    border: 1px solid var(--gray);
                    background-color: whitel
                    color: var(--gray);
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    font-size: .9em;
                    min-width: 80px;
                }
                .icon {
                    margin-right: 4px;
                    color: inherit;
                }
                .blue {
                    border: 1px solid var(--blue-dark);
                    background-color: var(--blue-light2);
                    color: var(--blue-dark);
                }
                .red {
                    border: 1px solid var(--red-dark);
                    background-color: var(--red-light);
                    color: var(--red-dark);
                }
                .green {
                    border: 1px solid var(--green-dark);
                    background-color: var(--green-light);
                    color: var(--green-dark);
                }
                .small {
                    padding: 0px 6px;
                    min-width: 40px;
                }
            `}</style>
        </button>
    )
}

export default Button;