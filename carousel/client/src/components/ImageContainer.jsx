import React, { useState, useEffect } from 'react';
import ImageItem from './ImageItem.jsx';
import styled from 'styled-components';

const Div = styled.div`
  margin: 20px;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: flex-start;
  overflow-x: auto;
`;

const BackSpan = styled.span`
  color: #ffffff;
  display: inline-block;
  vertical-align: middle;
  position: absolute;
  top: 150px;
  left: 30px;
  svg {
    fill: #ffffff;
  }
`;

const NextSpan = styled.span`
 display: inline-block; 
 position: absolute;
 right: 33px;
 top: 150px;
 svg {
   fill: #ffffff;
 }
`;

const ImageContainer = ({images, users}) => {
  const [currentImages, setCurrentImages] = useState(images);
  const [startCount, setStartCount] = useState(0);
  const numOfImages = 4;

  useEffect(() => {
    setCurrentImages(images.slice(startCount, startCount + numOfImages));
  },[images, startCount]) 

  const goLeft = () => {
    const leftCount = startCount - numOfImages;
    setStartCount(leftCount > 0 ? leftCount : 0); 
  };

  const goRight = () => {
    const rightCount = startCount + numOfImages;
    setStartCount(rightCount < images.length ? rightCount : images.length-1);
  };

  return (
    <Div>
        <BackSpan onClick={goLeft}>
            <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 48 48">
                <path d="M29.414 5.992c.566 0 1.137.192 1.614.588 1.115.925 1.296 2.613.404 3.77L20.902 24l10.53 13.65c.892 1.156.71 2.844-.404 3.77-1.116.924-2.743.737-3.635-.42L15.57 25.675a2.76 2.76 0 0 1 0-3.35L27.394 6.998a2.548 2.548 0 0 1 2.02-1.008z"></path>
            </svg>
        </BackSpan>
        {currentImages && currentImages.map((image, index) =>
            <ImageItem key={index} image={image} currentImgIdx={index} images={images} users={users}/>
        )}
        <NextSpan onClick={goRight}>
            <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 48 48">
                <path d="M18.586 42.008a2.518 2.518 0 0 1-1.614-.588c-1.115-.925-1.296-2.613-.404-3.77L27.098 24l-10.53-13.65c-.892-1.156-.71-2.844.404-3.77 1.116-.924 2.743-.737 3.635.42L32.43 22.325a2.76 2.76 0 0 1 0 3.35L20.606 41.002a2.548 2.548 0 0 1-2.02 1.008z"></path>
            </svg>
        </NextSpan>
    </Div>    
  )
}

export default ImageContainer