import styled from 'styled-components';
import React from 'react';
import { shallow, mount } from 'enzyme';
import renderer from 'react-test-renderer';

import ReviewList from '../components/ReviewList';


describe('ReviewList Test Suite', () => {
  const reviewList = [
      {
        "id": 2,
        "stars": 2,
        "uploadDate": "3/23/2020",
        "restaurantVisit": null,
        "content": "LOVE THIS PLACE",
        "emojiUseful": 1,
        "emojiFunny": 1,
        "emojiCool": null,
        "reply": null,
        "replyDate": null,
        "userName": "Minji Gwakster",
        "restaurantName": "Noodle Soupz",
        "pictures": []
    },
    {
        "id": 3,
        "stars": 4,
        "uploadDate": "2/12/2020",
        "restaurantVisit": 2,
        "content": "Chicken is finger licking gooood",
        "emojiUseful": 1,
        "emojiFunny": null,
        "emojiCool": 1,
        "reply": "Appreciate it!",
        "replyDate": "2/13/2020",
        "userName": "Billy Wonka",
        "restaurantName": "Kyochon Chicken",
        "pictures": ["https://pic4.jpg", "https://pic5.jpg"]
    }
  ]

  it('should render reviews', () => {
    const component = <ReviewList allReviews={reviewList}/>

    const list = renderer.create(component).toJSON()
    expect(list).toMatchSnapshot()
  })




})