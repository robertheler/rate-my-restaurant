import React from 'react';
// import styled from 'styled-components';
import ReservationWrapper from './ReservationWrapper.jsx';
import ReservationHeader from './ReservationHeader.jsx';
import CalendarDropdownButton from './CalendarDropdownButton.jsx';
import DropdownContainer from './DropdownContainer.jsx';
import FindTableButton from './FindTableButton.jsx';
import Calendar from './Calendar.jsx';

const ReservationBox = (props) => (
  <ReservationWrapper>
    <Calendar topState={props.state} reservationMethods={props.reservationMethods}/>
    <ReservationHeader/>
    <CalendarDropdownButton showCalendar={props.reservationMethods.showCalendar}
    selectedDateId={props.state.selectedDateId}>
    </CalendarDropdownButton>
    <DropdownContainer
    timeslots={props.state.timeslots} selectedDateId={props.state.selectedDateId}/>
    <FindTableButton>Find a Table</FindTableButton>
  </ReservationWrapper>
);

export default ReservationBox;
