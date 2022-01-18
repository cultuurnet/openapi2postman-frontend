import ReactTooltip from 'react-tooltip';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faQuestionCircle } from '@fortawesome/free-solid-svg-icons'
import styled from 'styled-components';

const QuestionMark = styled.div`
  display: inline-block;
  color: darkgrey;
  position: absolute;
  right: -25px;
  top: 5px;
`;

const Tooltip = (props) => {
  const { text } = props;
  return (
    <QuestionMark>
      <span data-tip={text}>
        <FontAwesomeIcon icon={faQuestionCircle} />
      </span>
      <ReactTooltip place="bottom" type="dark" effect="solid" />
    </QuestionMark>
  );
};

export { Tooltip };
