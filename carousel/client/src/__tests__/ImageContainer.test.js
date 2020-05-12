import React from 'react';
import { shallow } from 'enzyme';
import sampleResponse from '../../../sampleResponse';

// importing actual component
import ImageContainer from '../components/ImageContainer.jsx';

describe('ImageContainer test suite', () => {
  it('should render the ImageContainer component on screen', () => {
      const wrapper = shallow(<ImageContainer images={sampleResponse}/>);
      expect(wrapper).toExist();          
  })
})