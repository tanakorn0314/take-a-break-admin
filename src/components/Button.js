import React from 'react';

const Button = props => {
    return (
        <button {...props} className={`${props.className} ${props.color}`}>
            {props.children}
            <style jsx>{`
                button {
                    border-radius: 4px;
                    padding: 2px 20px;
                    cursor: pointer;
                    transition: color 0.1s ease-in-out;

                    border: 1px solid var(--gray);
                    background-color: whitel
                    color: var(--gray);
                    // outline: -webkit-focus-ring-color auto 5px;
                }
                .blue {
                    border: 1px solid var(--blue-dark);
                    background-color: var(--blue-light2);
                    color: var(--blue-dark);
                }
                .blue:hover {
                    color: var(--blue-light2);
                    background-color: var(--blue-light);
                    border: 1px solid var(--blue-light);
                }
                .red {
                    border: 1px solid var(--red-dark);
                    background-color: var(--red-light);
                    color: var(--red-dark);
                }
                .red:hover {
                    color: var(--red-light);
                    background-color: var(--red-dark);
                    border: 1px solid var(--red-light);
                }
                .green {
                    border: 1px solid var(--green-dark);
                    background-color: var(--green-light);
                    color: var(--green-dark);
                }
                .green:hover {
                    color: var(--green-light);
                    background-color: var(--green-dark);
                    border: 1px solid var(--green-light);
                }
            `}</style>
        </button>
    )
}

export default Button;