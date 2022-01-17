import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
    body {
      margin: 0;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
        'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
        sans-serif;
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
    }

    code {
      font-family: source-code-pro, Menlo, Monaco, Consolas, 'Courier New',
        monospace;
    }   

    p,
    input,
    select,
    button {
      font-size: 1.5rem;
    }

    .swiper-container {
      width: 800px;
    }

    .swiper-slide {
      text-align: center;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
      width: 700px;
      padding-bottom: 10px;
    }

    .swiper-button-next,
    .swiper-button-prev {
      color: #00AAE5;
    }

    .swiper-pagination-bullet-active {
      background: #00AAE5;
    }

    .swiper-pagination-bullets {
      bottom: 0 !important;
    }
`;

export { GlobalStyle };
