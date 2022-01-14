import { Form } from './Form';
import styled from 'styled-components';
import { createGlobalStyle } from 'styled-components';
import { Logos } from './components/Logos';
import { Intro } from './components/Intro';

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

    .swiper-slide {
      text-align: center;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
      width: 700px;
    }
`;

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  flex-wrap: wrap;
`;

export default function App() {
  return (
    <>
      <GlobalStyle />
      <Container className="App">
        <Logos />
        <Intro />
        <Form />
      </Container>
    </>
  );
}
