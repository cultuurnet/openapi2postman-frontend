import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 250px;
  margin: 5rem 0 2.5rem 0;
`;

const Logos = (props) => {
  return (
    <Container>
      <img
        src="https://postman.publiq.be/publiq-logo.png"
        alt="publiq logo"
        width="130"
      />
      <img
        src="https://postman.publiq.be/postman-logo.png"
        alt="postman logo"
        width="100"
      />
    </Container>
  );
};

export { Logos };
