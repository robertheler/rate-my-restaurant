import React from 'react';
import { shallow } from 'enzyme';

// importing actual component
import ImageItem from '../components/ImageItem';

describe('ImageItem test suite', () => {
    it('should render the ImageItem component on screen', () => {
        const props = {
            "imageId": 1,
            "imageTitle": "testImage",
            "itemImage": "https://fec-yelp-images.s3-us-west-1.amazonaws.com/food1.jpg",
            "imageCategory": "food",
            "imageDescription": "yummy dish",
            "imageUploadDate": "2020-05-01T07:00:00.000Z",
            "userId": 1,
            "restaurantId": 2
        };
        const wrapper = shallow(<ImageItem image={props}/>);
        expect(wrapper).toExist();          
    });
})