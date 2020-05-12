import React, { useState } from 'react';
import styled from 'styled-components';

const ImageContainer = styled.div`
    height: 100%;
    position: relative;
`;

const HeaderContainer = styled.div`
    font-size: 20px;
    line-height: 26px;
    font-family: Open Sans,Helvetica Neue,Helvetica,Arial,sans-serif;
    word-wrap: break-word!important;
    word-break: break-word!important;
    overflow-wrap: break-word!important;
    color: #2b273c;
    font-weight: 700;
    padding: 16px;
    h4 {
        margin-bottom: 0;
        margin-top: 0;
    };
    a {
        font-size: 14px;
        font-style: normal;
        line-height: 20px;
        color: #00838f;
        font-family: Open Sans,Helvetica Neue,Helvetica,Arial,sans-serif;
        text-decoration: none;
    }
`;

const PhotosContainer = styled.div`
    height: 83%;
    overflow-y: scroll;   
    position: absolute;
    top: 76px;
    bottom: 0px;
    left: 0px;
    right: 0px; 
    padding: 12px;
    .individualPhoto {
        display: inline-block;
        border-right: 2px solid #ffffff;
        border-radius: 3px;
        width: 150px;
        height: 150px;
        margin-right: 1px;
        margin-top: 3px;
        border: 3px solid #ffffff;
        img {
            height: 150px;
            width: 150px;
        }
        &.active {
            border: 3px solid #0097ec;
            border-radius: 4px;
            img {
                -webkit-filter: blur(5px); /* Safari 6.0 - 9.0 */
                filter: blur(1px);
            }
        }
    }
`;

const ModalImagesContainer = ({images, currentIndex, onImageClick}) => {
    const handleImageClick = (index) => (event) => {
        onImageClick && onImageClick(index);
    }
    return (
        <ImageContainer>
            <HeaderContainer>
                <div>
                    <h4>Photos of Voodoo Love</h4>
                    <a>See all 12 photos</a>
                </div>
            </HeaderContainer>
            <PhotosContainer>
                {images && images.map((image, index) => 
                    <div className={`individualPhoto ${currentIndex === index ? 'active': ''}`} key={index} onClick={handleImageClick(index)}>
                        <img src={image.itemImageUrl}></img>    
                    </div> 
                )}
            </PhotosContainer>
        </ImageContainer>
    )
}

export default ModalImagesContainer;