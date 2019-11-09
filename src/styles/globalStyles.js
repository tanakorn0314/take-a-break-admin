import css from 'styled-jsx/css';
import fonts from './fonts';

const globalStyles = css.global`
    ${fonts}

    :root {
        --blue: #2BA4C9;
        --blue-light: #4DA6FF;
        --red: #FF8686;
        --red-light: #FFDBDB;
        --red-dark: #B70000;
        --green: #86FF99;
        --green-light: #E3FFDB;
        --green-dark: #00B723;
        --yellow: #F4E100;
        --yellow-light: #FFE8A8;
        --gray: #535353;
        --gray-light: #AFAFAF;
    }

    *, body {
        margin: 0;
        color: var(--gray);
    }

    * {
        font-family: 'Roboto', sans-serrif;
    }

`;

export default globalStyles;