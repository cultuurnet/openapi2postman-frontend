import styled  from "styled-components"

const Alert = (props) => {
  const Container = styled.div`
  `
 return (
  <Container>{props.text}</Container>
 );
}

export { Alert }