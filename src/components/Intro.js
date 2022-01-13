import styled from 'styled-components';

const Intro = (props) => {
  const Container = styled.div`
    max-width: 500px;
    background-color: #efefef;
    padding: 15px 15px 0 15px;
    border-radius: 5px;
    margin-bottom: 2.5rem;
  `;

  const Paragraph = styled.p`
    margin-bottom: 15px;
  `;
  return (
    <Container>
      <Paragraph>
        Ready to start playing around with our APIs? Use the form below to download a personalized <a href="https://www.postman.com/" target="_blank" rel="noreferrer">Postman</a> collection to start making API requests to our test environment in a matter of seconds!
      </Paragraph>
      <Paragraph>
        We also provide extensive <a href={'https://docs.publiq.be'}>API documentation</a> with how-to guides, a technical reference for each API endpoint, and info about authentication and error handling.
      </Paragraph>
    </Container>
  );
};

export { Intro };
