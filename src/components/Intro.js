import styled  from "styled-components"

const Intro = (props) => {
  const Container = styled.div`
    max-width: 500px;
    background-color: #efefef;
    padding: 15px;
    border-radius: 5px;
    margin-bottom: 2.5rem;
  `

  const Paragraph = styled.p`
    margin-bottom: 0;
  `
 return (
  <Container>
    <Paragraph>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</Paragraph>
  </Container>
 );
}

export { Intro }