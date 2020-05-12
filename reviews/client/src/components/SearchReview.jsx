import React from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';


// under search bar, need to show
// # reviews mentioning "searched word"
// button next to it that says "Clear results x"

const SearchDiv = styled.div `
  border-color: #eeeeef;
  margin-bottom: 40px;
`
const SearchSortDiv = styled.div `
  border-spacing: 24px 0;
  display: table;
  margin-top: 0px;
`
const SearchbarDiv = styled.div `
  display: table-cell;
  margin-top: 0px;
`
const SearchInput = styled.input `
  height: 48px;
  padding: 13px 15px;
  background-color: #fff;
  border: 1px solid #bbbac0;
  border-radius: 4px;
  font-family: Open Sans,Helvetica Neue,Helvetica,Arial,sans-serif;
  font-weight: 400;
  font-size: 14px;
  line-height: 20px;
`
const Button = styled.button `
  position: relative;
  top: 7px;
  left: -4px;
  border-radius: 0 4px 4px 0;
  border: none;
  padding: 12px 16px 16px;
  height: 48px;
  background: #f43939;
`
const SortBy = styled.span `
  font-family: Open Sans,Helvetica Neue,Helvetica,Arial,sans-serif;
  font-weight: 400;
  font-size: 14px;
  line-height: 20px;
  padding-right: 5px;
`
const SortByOptions = styled.option `
  color: #00838f;
  font-family: Open Sans,Helvetica Neue,Helvetica,Arial,sans-serif;
  font-weight: 400;
  font-size: 14px;
  line-height: 20px;
`
const SearchResultMssg = styled.span `
font-weight: 700;
font-family: Open Sans,Helvetica Neue,Helvetica,Arial,sans-serif;
font-size: 14px;
line-height: 20px;
padding: 4px;
`
const ClearResultBox = styled.button `
  padding: 7px;
  border: 1px solid #ccc;
  border-radius: 3px;
  font-size: 12px;
  line-height: 18px;
  color: #757280;
  background: transparent;
  box-shadow: none;
  font-family: Open Sans,Helvetica Neue,Helvetica,Arial,sans-serif;
  text-decoration: none;
`
const SearchReview = (props) => (
  <SearchDiv>
    <SearchSortDiv>
      <SearchbarDiv>
        <SearchInput type="text" value={props.searchedTerm} onChange={(e) => props.handleChange(e)} placeholder="Search within reviews"/>
        <Button type="button" onClick={() => props.handleSubmit()}>
          <span>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" class="icon_svg">
              <path d="M22.46 21.05l-3.72-3.72a10 10 0 1 0-1.41 1.41l3.72 3.72a1 1 0 0 0 1.41 0 1 1 0 0 0 0-1.41zM5.34 16.66A8 8 0 1 1 16.66 5.353 8 8 0 0 1 5.34 16.66z"></path>
            </svg>
          </span>
        </Button>
    </SearchbarDiv>
      <div>
        <SortBy>Sort by</SortBy>
        <select value={props.sortValue} onChange={props.handleChangeSort}>
          <SortByOptions value="reviews.uploadDate desc">Newest First</SortByOptions>
          <SortByOptions value="reviews.uploadDate asc">Oldest First</SortByOptions>
          <SortByOptions value="reviews.stars desc">Highest Rate</SortByOptions>
          <SortByOptions value="reviews.stars asc">Lowest Rate</SortByOptions>
          <SortByOptions value="elite">Elites</SortByOptions>
        </select>
      </div>
    </SearchSortDiv>
    <span>
      {
        props.searchedTerm.length > 0 &&
        <div>
          <SearchResultMssg>
            {props.searchedReviews.length} reviews mentioning "{props.searchedTerm}"
          </SearchResultMssg>
          <span>
            <ClearResultBox type="button" onClick={() => props.handleSubmitClear()}> Clear results <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 14 14" class="icon_svg"><path d="M7.025 8.4l-2.122 2.12A1 1 0 0 1 3.49 9.106l2.12-2.122-2.12-2.12A1 1 0 1 1 4.903 3.45l2.122 2.12 2.12-2.12a1 1 0 1 1 1.415 1.41L8.44 6.98l2.12 2.123a1 1 0 0 1-1.414 1.414L7.026 8.4z"></path></svg>
            </ClearResultBox>
          </span>
        </div>
      }
    </span>
  </SearchDiv>
);

export default SearchReview;
