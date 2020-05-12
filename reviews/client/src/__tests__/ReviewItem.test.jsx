import React from 'react';
import { shallow } from 'enzyme';

import ReviewItem from '../components/ReviewItem';

describe('ReviewItem Test Suite', () => {
  const reviewItem = {
    stars: 4,
    pictures: ['https:pic1.jpg', 'https:pic2.jpg', 'https://pic3.jpg'],
    content: 'this was so delicious!'
  }

  it('displays the review content', () => {
    const wrapper = shallow(<ReviewItem reviewItem={reviewItem}/>)

    expect(wrapper.contains('this was so delicious!')).toBe(true)
  });



});