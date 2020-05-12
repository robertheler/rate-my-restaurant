/* eslint-disable import/extensions */
import styled from 'styled-components';
import React from 'react';
import WeekdayRow from './WeekdayRow.jsx';
import CalendarRow from './CalendarRow.jsx';
import CalendarDate from './CalendarDate.jsx';
import calendarHelpers from '../calendarHelpers.js';

const weekdays = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];

const Table = styled.table`
  display: table;
  margin: 0 16px 16px;
  border-collapse: separate;
  border-spacing: 5px;
`;

const Wrapper = styled.div`
`;

const CalendarTable = (props) => (
  <Wrapper>
    <Table>
      <tbody>
      <WeekdayRow>
      {weekdays.map((day) => <td>{day}</td>)}
      </WeekdayRow>
      {props.state.rowsOfSelectedMonth.map((row) => <CalendarRow>
        {row.map((dateId) => <CalendarDate
          onClick={props.reservationMethods.selectDate}
          id={dateId}
          past={props.calendarMethods.isPast(dateId)}
          isToday={props.calendarMethods.isToday(dateId)}
          selected={dateId === props.selectedId}>
          {calendarHelpers.dayNumFromId(dateId)}
        </CalendarDate>)}
      </CalendarRow>)}
      </tbody>
    </Table>
  </Wrapper>
);

export default CalendarTable;
