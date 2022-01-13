import styled from 'styled-components';

const Logos = (props) => {
  const Container = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 250px;
    margin: 5rem 0 2.5rem 0;
  `;
  return (
    <Container>
      <img
        src="https://cultuurnet.github.io/openapi2postman-frontend/publiq-logo.png"
        alt="publiq logo"
        width="130"
      />
      <img
        src="https://cultuurnet.github.io/openapi2postman-frontend/postman-logo.png"
        alt="postman logo"
        width="100"
      />
    </Container>
  );
};

export { Logos };
