/* eslint-disable radix */
import styled from 'styled-components';
import React from 'react';
import calendarHelpers from '../calendarHelpers.js';

const peopleArray = (maxPeople) => {
  const arr = [];
  let i = 2;
  while (i <= maxPeople) {
    arr.push(i);
    i += 1;
  }
  return arr;
};

const parseTimeslot = (timeslot) => {
  const timeString = timeslot.toString();
  let hour = parseInt(timeString.substring(0, 2));
  const minutes = timeString.substring(2, 4);
  let amPm = 'am';
  if (hour === 12) {
    amPm = 'pm';
  } else if (hour > 12) {
    hour -= 12;
    amPm = 'pm';
  }
  return (`${hour}:${minutes} ${amPm}`);
};

const SvgLight = styled.svg`
  height: 18px;
  width: 18px;
  fill: #666;
`;

const SvgDark = styled.svg`
  height: 18px;
  width: 18px;
  fill: #333;
`;

const LeftSvgSpan = styled.span`
  position: absolute;
  left: 16px;
  top: 12px;
  pointer-events: none;
`;

const RightSvgSpan = styled.span`
  position: absolute;
  right: 16px;
  top: 16px;
  pointer-events: none;
`;

const SelectWrapper = styled.div`
  float:left;
  margin-left: 4px;
  margin-right: 4px;
  margin-bottom: 8px;
  position: relative;
`;

const SelectBox = styled.select`
padding-left: 48px;
padding-right: 44px;
min-width: 161.5px;
-webkit-appearance: none;
-moz-appearance: none;
appearance: none;
border: 1px solid #bbbac0;
border-radius: 4px;
background: white;
height: 48px;
font-weight: 400;
font-size: 14px;
line-height: 20px;
outline: none;
`;

const TimeDropdown = (props) => (
  <SelectWrapper>
    <LeftSvgSpan>
      <SvgLight xmlns='http://www.w3.org/2000/svg'>
      <path d='M9 17A8 8 0 1 1 9 1a8 8 0 0 1 0 16zM9 2C5.14 2 2 5.14 2 9s3.14 7 7 7 7-3.14 7-7-3.14-7-7-7zm3.223 10.098a.998.998 0 0 1-.588-.192L8 9.256V5a1 1 0 0 1 2 0v3.24l2.812 2.05a1 1 0 0 1-.59 1.808z'></path>
      </SvgLight>
    </LeftSvgSpan>
    <RightSvgSpan>
      <SvgDark xmlns='http://www.w3.org/2000/svg'>
      <path d='M8 10.5a1 1 0 0 1-.7-.29l-3.06-3a1 1 0 1 1 1.41-1.42L8 8.1l2.35-2.31a1 1 0 0 1 1.41 1.42l-3.06 3a1 1 0 0 1-.7.29z'></path>
      </SvgDark>
    </RightSvgSpan>
    <SelectBox>
    {props.timeslots[calendarHelpers.weekdayFromId(props.selectedDateId)].map((slot) => <option value={slot}>
      {parseTimeslot(slot)}</option>)}
    </SelectBox>
  </SelectWrapper>
);
const SizeDropdown = () => (
  <SelectWrapper>
     <LeftSvgSpan>
      <SvgLight xmlns='http://www.w3.org/2000/svg'>
      <path d='M7.904 9.43l-2.098 4.697a.9.9 0 0 1-1.612 0L2.096 9.43a.902.902 0 0 1 .806-1.305h4.196c.67 0 1.105.705.806 1.305zM5 7.375a2 2 0 1 1 0-4 2 2 0 0 1 0 4z'></path>
      <path d='M15.904 9.43l-2.098 4.697a.89.89 0 0 1-.806.498.89.89 0 0 1-.806-.498L10.096 9.43a.902.902 0 0 1 .806-1.305h4.195c.67 0 1.106.705.807 1.305zM13 7.375a2 2 0 1 1 0-4 2 2 0 0 1 0 4z' opacity=".502"></path>
      </SvgLight>
    </LeftSvgSpan>
    <RightSvgSpan>
      <SvgDark xmlns='http://www.w3.org/2000/svg'>
      <path d='M8 10.5a1 1 0 0 1-.7-.29l-3.06-3a1 1 0 1 1 1.41-1.42L8 8.1l2.35-2.31a1 1 0 0 1 1.41 1.42l-3.06 3a1 1 0 0 1-.7.29z'></path>
      </SvgDark>
    </RightSvgSpan>
    <SelectBox defaultValue='2'>
    <option value='1'>1 person</option>
    {peopleArray(20).map((number) => <option value={number}>{number} people</option>)}
    </SelectBox>
  </SelectWrapper>
);
const DropdownBox = styled.div`
  display: inherit;
  margin-left: -4px;
`;
const DropdownContainer = (props) => (
  <DropdownBox>
    <TimeDropdown timeslots={props.timeslots} selectedDateId={props.selectedDateId}/>
    <SizeDropdown/>
  </DropdownBox>
);
export default DropdownContainer;
