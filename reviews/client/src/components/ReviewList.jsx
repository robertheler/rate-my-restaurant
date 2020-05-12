import React from 'react';
import ReactDOM from 'react-dom';
import ReviewItem from './ReviewItem.jsx';
import Pagination from './Pagination.jsx';

import styled from 'styled-components';

// need a write review item
// pass down user's profile
// hover -> star
// make a modal that lets you write a review and submit

const UnorderedList = styled.ul `
  list-style: none;
  margin: 0;
  padding: 0;
  border: 0;
  font-size: 100%;
  font: inherit;
  vertical-align: baseline;
  margin-block-start: 1em;
  margin-block-end: 1em;
  margin-inline-start: 0px;
  margin-inline-end: 0px;
  padding-inline-start: 40px;
  color: #333;
`

const ReviewList = (props) => {
  const numPages = Math.ceil(props.allReviews.length/3);
  let pagesArr = [];
  for (let i = 1; i < numPages + 1; i++) {
    pagesArr.push(i)
  }

  return (
    <div>
      <UnorderedList>
        {
          props.allReviews.map((item) => {
            return <li><ReviewItem reviewItem={item} buttonSubmit={props.buttonSubmit}/></li>
          })
        }
      </UnorderedList>

      {/* <span>
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" class="icon_svg"><path d="M14.25 17.58a1 1 0 0 1-.71-.3L9 12.7a1 1 0 0 1 0-1.4l4.5-4.58A1 1 0 0 1 15 6.7a1 1 0 0 1 0 1.42L11.15 12 15 15.88a1 1 0 0 1 0 1.42 1 1 0 0 1-.75.28z"></path></svg>
      {
        pagesArr.map((pageNum) => {
          return <Pagination pageNum={pageNum}/>
        })
      }
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" class="icon_svg"><path d="M9.75 17.58a1 1 0 0 1-.7-.28 1 1 0 0 1 0-1.42l3.8-3.88L9 8.12a1 1 0 1 1 1.41-1.42L15 11.3a1 1 0 0 1 0 1.4l-4.5 4.58a1 1 0 0 1-.75.3z"></path></svg>
      </span> */}
    </div>
)}

export default ReviewList;
