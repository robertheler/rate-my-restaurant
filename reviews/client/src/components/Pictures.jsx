import React from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';

const ImageForm = styled.span `
  margin: 5px;
  border-color: #eeeeef;
`
export const ImageSize = styled.img `
  height: 168px;
  width: 168px;
  loading: lazy;
  outline: none;
  border-radius: 4px;
  vertical-align: middle;
  margin: 5px;
`

const Pictures = (props) => (
  <ImageForm>
    <ImageSize src={props.picture} alt={props.retaurant}/>
  </ImageForm>
);

export default Pictures;