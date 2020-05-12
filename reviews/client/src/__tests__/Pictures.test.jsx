import React from 'react';
import { shallow } from 'enzyme';

import Pictures, {ImageSize} from '../components/Pictures';

describe('Pictures Test Suite', () => {
  const picture = 'https:pic1.jpg';

  it('displays the pictures', () => {
    const wrapper = shallow(<Pictures picture={picture}/>)
    const image = wrapper.find(ImageSize);
    console.log(wrapper.debug())
    expect(wrapper.containsMatchingElement(<ImageSize src='https:pic1.jpg'/>)).toBe(true)
  })

})