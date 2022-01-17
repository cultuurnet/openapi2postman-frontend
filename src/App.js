import { Form } from './Form';
import React, { useState } from 'react';
import { GlobalStyle } from './styles/GlobalStyle';
import styled from 'styled-components';
import { Logos } from './components/Logos';
import { Intro } from './components/Intro';

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  flex-wrap: wrap;
`;

export default function App() {
  const [hideIntro, setHideIntro] = useState(false);

  return (
    <>
      <GlobalStyle />
      <Container className="App">
        <Logos />
        {!hideIntro && <Intro />}
        <Form onDownloadCompleted={setHideIntro} />
      </Container>
    </>
  );
}
