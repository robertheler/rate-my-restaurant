import styled from 'styled-components';
import React from 'react';

const NextMonthArrow = styled.svg`
   height: 24px;
   width: 24px;
   fill: ${(props) => (props.disabled ? '#cfced5' : 'inherit')};
`;

const NextMonthSpan = styled.span`
  position: absolute;
  right: 12px;
  top: 18px;
  :hover {
    cursor: pointer;
  };
  pointer-events: ${(props) => (props.disabled ? 'none' : 'auto')};
`;

const NextMonthButton = (props) => (
  <NextMonthSpan id='nextButton' disabled={props.disabled}>
    <NextMonthArrow disabled={props.disabled} onClick={props.onClick} xmlns='http://www.w3.org/2000/svg'>
      <path d="M9.525 5.636L8.11 7.05 13.06 12l-4.95 4.95 1.415 1.414L15.89 12 9.524 5.636z"></path>
    </NextMonthArrow>
  </NextMonthSpan>
);

export default NextMonthButton;
