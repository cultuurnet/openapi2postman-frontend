import styled from 'styled-components';

const Container = styled.div`
  padding: 15px;
  background-color: #f2dede;
  border: 1px solid #ebccd1;
  color: #a94442;
  margin-bottom: 2rem;
  width: 500px;
`;

const Alert = (props) => {
  return <Container>{props.text}</Container>;
};

export { Alert };
