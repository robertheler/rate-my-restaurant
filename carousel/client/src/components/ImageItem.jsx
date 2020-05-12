import React, { useState, useRef } from 'react';
import styled from 'styled-components';
import ModalContainer from './ModalContainer.jsx';

const Div = styled.div`
  border-right: 2px solid white;
  img {
    height: 100%;
    width: 350px;
    object-fit: cover;
    vertical-align: middle;
  }
`;

const ImageItem = ({images, image, users, currentImgIdx}) => {
  const ref = useRef(null);

  const openModal = () => {
    //console.log('Click on each image');
    ref.current.showModal();
  };

  return (
    <>
    <Div onClick={openModal}>
        <span>       
            <img src={image.itemImageUrl} alt="food image"/>           
        </span>
    </Div>
    <ModalContainer clickedImage={image} currentImgIdx={currentImgIdx} allImages={images} allUsers={users} ref={ref} />
    </>
  );
}

export default ImageItem