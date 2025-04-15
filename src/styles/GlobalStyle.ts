// src/styles/GlobalStyle.ts
import { createGlobalStyle } from 'styled-components'

export const GlobalStyle = createGlobalStyle`
  /* Pretendard 웹폰트 */
  @font-face {
    font-family: 'Pretendard-Regular';
    src: url('https://fastly.jsdelivr.net/gh/Project-Noonnu/noonfonts_2107@1.1/Pretendard-Regular.woff') format('woff');
    font-weight: 400;
    font-style: normal;
  }

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    font-family: 'Pretendard-Regular', sans-serif;
    background-color: #faf9f6;
    color: #111;
    line-height: 1.6;
  }

  a {
    color: inherit;
    text-decoration: none;
  }

  img {
    max-width: 100%;
    display: block;
  }

  button,
  input,
  textarea {
    font-family: inherit;
  }

  button {
    all: unset;
    cursor: pointer;
  }
`
