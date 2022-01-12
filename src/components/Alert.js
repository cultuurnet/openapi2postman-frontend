import styled from 'styled-components';

const Alert = (props) => {
  const Container = styled.div`
    padding: 15px;
    background-color: #f2dede;
    border: 1px solid #ebccd1;
    color: #a94442;
    margin-bottom: 2rem;
  `;
  return <Container>{props.text}</Container>;
};

export { Alert };
