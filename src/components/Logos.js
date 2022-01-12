import styled  from "styled-components"

const Logos = (props) => {
  const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 300px;
  margin: 5rem 0 2.5rem 0;
  `
 return (
  <Container>
    <img src="/publiq-logo.png" alt="publiq logo" width="150" />
    <img src="/postman-logo.png" alt="postman logo" width="120" />
  </Container>
 );
}

export { Logos }