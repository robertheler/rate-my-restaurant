/* eslint-disable no-undef */
/* eslint-disable import/extensions */
/* eslint-disable no-console */
import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import calendarHelpers from '../calendarHelpers.js';
import ReservationBox from './ReservationBox.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.reservationMethods = {
      selectDate: this.selectDate.bind(this),
      showCalendar: this.showCalendar.bind(this),
      hideCalendar: this.hideCalendar.bind(this),
    };

    this.todaysId = calendarHelpers.createId(new Date().getYear() + 1900, new Date().getMonth(),
      new Date().getDate());

    // selectedDateId 'lifted up' from Calendar App to be used for ReservationBox

    this.state = {
      dates_closed: [],
      restaurant_name: '',
      timeslots: [[1100], [1100], [1100], [1100], [1100], [1100], [1100]],
      selectedDateId: this.todaysId,
      displayCalendar: false,
    };
  }

  componentDidMount() {
    document.body.addEventListener('click', this.hideCalendar.bind(this));
    this.getScheduleData();
  }

  componentWillUnmount() {
    document.body.removeEventListener('click', this.hideCalendar.bind(this));
  }

  getScheduleData() {
    $.ajax({
      url: 'http://localhost:3001/reservations/2',
      success: (data) => {
        this.setData(data);
      },
      error: () => {
        console.log('Could not retrieve schedule data');
      },
      dataType: 'json',
    });
  }

  setData(scheduleData) {
    this.setState({
      dates_closed: scheduleData.dates_closed,
      restaurant_name: scheduleData.restaurantName,
      timeslots: scheduleData.timeslots,
    });
  }

  delayedClose() {
    setTimeout(() => {
      this.setState({
        displayCalendar: false,
      });
    }, 200);
  }

  // the below method should normally be in the Calendar component (minus the delayedClose callback)
  // however, it's in this component as the 'selectedDateId' state is used for all subcomponents
  // in the App!

  selectDate(e) {
    const dateId = parseFloat(e.target.id);
    this.setState({
      selectedDateId: dateId,
    }, this.delayedClose);
  }

  showCalendar() {
    this.setState({
      displayCalendar: true,
    });
  }

  hideCalendar() {
    this.setState({
      displayCalendar: false,
    });
  }

  render() {
    return (
      <div className='calendar-container'>
        <ReservationBox state={this.state} reservationMethods={this.reservationMethods}/>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('reservations'));

// assign unique numerical values as ids to each table cell - done
// check if each cell's value is less than the value of the current date
// if so, add a class unselectable to those cells

// this class should make it unclickable, greyed out, and have no hover effect

// disable next or previous month clicker if the next or previous month isn't in the surrounding mos

// after completion of render, get the element where id is equal to the identifier for today's date

// research how to have a table cell as selected value, apply a 'selected' class to that (as state)