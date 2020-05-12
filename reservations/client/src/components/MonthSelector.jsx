import styled from 'styled-components';
import React from 'react';
import PreviousMonthButton from './PreviousMonthButton.jsx';
import NextMonthButton from './NextMonthButton.jsx';
import calendarHelpers from '../calendarHelpers.js';

const MonthSelectorContainer = styled.div`
  text-align: center;
  line-height: 28px;
  font-weight: 700;
  font-family: Open Sans, Helvetica Neue, Helvetica, Arial, sans-serif;
  font-size: 16px;
  color: #2b273c;
  padding-top: 16px;
  margin-bottom: 16px;
  vertical-align: baseline;
  position: relative;
  user-select: none;
`;

const MonthSelector = (props) => (
  <MonthSelectorContainer id='monthSelector'>
    <PreviousMonthButton onClick={props.calendarMethods.getPreviousMonth}
    disabled={new Date().getMonth() === props.state.selectedMonthNumber}/>
    {calendarHelpers.monthNumToName(props.state.selectedMonthNumber)} {props.state.selectedYear}
    <NextMonthButton onClick={props.calendarMethods.getNextMonth}
    disabled={props.state.selectedMonthNumber === props.latestMonth}/>
  </MonthSelectorContainer>
);

export default MonthSelector;
