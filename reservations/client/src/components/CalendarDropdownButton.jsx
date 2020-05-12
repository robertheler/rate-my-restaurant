import styled from 'styled-components';
import React from 'react';
import calendarHelpers from '../calendarHelpers.js';

const CalendarDropdownBox = styled.div`
  width: 299px;
  border: thin solid black;
  display: inherit;
  padding: 13px 15px;
  border: 1px solid #bbbac0;
  border-radius: 4px;
  margin-bottom: 8px;
  position: relative;
  font-weight: 400;
  height: 20px;
  font-size: 14px;
  line-height: 20px;
`;

const Svg = styled.svg`
  height: 18px;
  width: 18px;
  fill: #333;
`;

const SvgSpan = styled.span`
  position: absolute;
  right: 16px;
  top: 14px;
  pointer-events: none;
`;

const CalendarDropdownButton = (props) => (
  <CalendarDropdownBox onClick={props.showCalendar}>
    {calendarHelpers.idToLongDate(props.selectedDateId)}
    <SvgSpan>
      <Svg xmlns='http://www.w3.org/2000/svg'>
      <path d='M8 10.5a1 1 0 0 1-.7-.29l-3.06-3a1 1 0 1 1 1.41-1.42L8 8.1l2.35-2.31a1 1 0 0 1 1.41 1.42l-3.06 3a1 1 0 0 1-.7.29z'></path>
      </Svg>
    </SvgSpan>
  </CalendarDropdownBox>

);

export default CalendarDropdownButton;

// add transition
