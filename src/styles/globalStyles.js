import css from 'styled-jsx/css';
import fonts from './fonts';

const globalStyles = css.global`
    ${fonts}

    :root {
        --blue: #2BA4C9;
        --blue-light: #4DA6FF;
        --blue-light2: #D1F3FF;
        --blue-dark: #0082B2;
        --blue-dark2: #0198BC;
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

    body, div, span, h1, h2, h3, h4, h5, h6, p, ul, li, ol, button {
        margin: 0;
        color: var(--gray);
        font-family: 'Roboto', sans-serrif;
        word-break: break-all;
    }

    * {
        color: inherit;
    }

    a {
        text-decoration: none;
    }

    .label {
        font-weight: 400;
        font-size: 1em;
    }

    p, label, input, textarea {
        font-weight: 200;
        font-size: 1em;
    }

    h2 {
        font-weight: 400;
        font-size: 1.5em;
    }

    h3 {
        font-weight: 400;
        font-size: 1.3em;
    }

    h4 {
        font-weight: 400;
        font-size: 1em;
    }

    .text-muted {
        color: var(--gray-light);
    }

    .small {
        font-size: .6em;
    }

`;

export default globalStyles;