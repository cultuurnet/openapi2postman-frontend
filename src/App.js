import './index.css';
import { Form } from './Form';
import styled from 'styled-components';
import { Logos } from './components/Logos';
import { Intro } from './components/Intro';

export default function App() {
  const Container = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    flex-wrap: wrap;
  `;

  return (
    <Container className="App">
      <Logos />
      <Intro />
      <Form />
    </Container>
  );
}