/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */

// use jest --updateSnapshot --'testNamePattern' to re-record snapshot of particular test

import React from 'react';
import { shallow, mount } from 'enzyme';
import Calendar from './Calendar.jsx';

describe('Calendar Snapshot', () => {
  it('should render correctly in "debug" mode', () => {
    const component = shallow(<Calendar debug />);

    expect(component).toMatchSnapshot();
  });
});
