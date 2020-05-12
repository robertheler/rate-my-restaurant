import React from 'react';
import { shallow } from 'enzyme';

// importing actual component
import App from '../components/App';

describe('App test suite', () => {
    it('should render the App component on screen', () => {
        const wrapper = shallow(<App />);
        expect(wrapper).toExist(); 
    })
})