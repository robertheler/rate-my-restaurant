import React, { useState } from 'react';
import styled from 'styled-components';

const ImageContainer = styled.div`
    height: 100%;
    text-align: center;
    font-size: 0;
    background: #000;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    img {
        width: 541px;
        height: 600px;
        vertical-align: middle;
        display: inline-block;
    }
`;

const BackSpan = styled.span`
  color: #ffffff;
  display: inline-block;
  vertical-align: middle;
  position: absolute;
  top: 300px;
  left: 20px;
  svg {
    fill: #ffffff;
  }
`;

const NextSpan = styled.span`
 display: inline-block; 
 position: absolute;
 right: 20px;
 top: 300px;
 svg {
   fill: #ffffff;
 }
`;

const ImageCarousel = ({images, selectedImage, onPrevClick, onNextClick}) => {
    return (
        <div>
           <BackSpan onClick={onPrevClick}>
                <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 48 48">
                    <path d="M29.414 5.992c.566 0 1.137.192 1.614.588 1.115.925 1.296 2.613.404 3.77L20.902 24l10.53 13.65c.892 1.156.71 2.844-.404 3.77-1.116.924-2.743.737-3.635-.42L15.57 25.675a2.76 2.76 0 0 1 0-3.35L27.394 6.998a2.548 2.548 0 0 1 2.02-1.008z"></path>
                </svg>
            </BackSpan>
           <ImageContainer>
             <img src={selectedImage.itemImageUrl} alt="food image"/>     
           </ImageContainer>
           <NextSpan onClick={onNextClick}>
                <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 48 48">
                    <path d="M18.586 42.008a2.518 2.518 0 0 1-1.614-.588c-1.115-.925-1.296-2.613-.404-3.77L27.098 24l-10.53-13.65c-.892-1.156-.71-2.844.404-3.77 1.116-.924 2.743-.737 3.635.42L32.43 22.325a2.76 2.76 0 0 1 0 3.35L20.606 41.002a2.548 2.548 0 0 1-2.02 1.008z"></path>
                </svg>
        </NextSpan>
        </div>
    );
}

export default ImageCarousel;