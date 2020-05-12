import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import ReactPaginate from 'react-paginate';
import styled from 'styled-components';

import ReviewList from './ReviewList.jsx';
import SearchReview from './SearchReview.jsx';

const ReviewPage = styled.section `
  border-color: #eeeeef;
  border-top: 1px solid #eeeeef;
  padding-top: 32px!important;
  margin-top: 32px!important;
  display: block;
  margin: 0;
  padding: 0;
  border: 0;
  font-size: 100%;
  font: inherit;
  vertical-align: baseline;
  min-width: 700px;
`

const Recommended = styled.div `
  margin-left: -12px;
  margin-right: -12px;
  border-collapse: separate;
  border-spacing: 12px 0;
  display: table;
  min-width: 100%;
  table-layout: auto;
  border-color: #eeeeef;
  margin-bottom: 24px!important;
`

const RecommendedDiv = styled.div `
  border-collapse: collapse;
  border-spacing: 0;
  margin-left: 6px;
  margin-right: 6px;
  vertical-align: middle;
  box-sizing: border-box;
  display: table-cell;
  width: 100%;
  border-color: #eeeeef;
`

const RecommendedText = styled.h4 `
  display: inline;
  font-size: 20px;
  line-height: 26px;
  font-family: Open Sans,Helvetica Neue,Helvetica,Arial,sans-serif;
  word-wrap: break-word!important;
  word-break: break-word!important;
  overflow-wrap: break-word!important;
  color: #2b273c;
  font-weight: 700;
  margin-block-start: 1.33em;
  margin-block-end: 1.33em;
  margin-inline-start: 0px;
  margin-inline-end: 0px;
  border-collapse: collapse;
  border-spacing: 0;
`

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      reviews: [],
      searchedReviews: [],
      searchedTerm: '',
      sortValue: 'newest first',
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleChangeSort = this.handleChangeSort.bind(this);
    this.handleSubmitClear = this.handleSubmitClear.bind(this);
    this.buttonSubmit = this.buttonSubmit.bind(this);
  }

    componentDidMount() {
      axios.get('/reviews/restaurants/2')
        .then(res => {
          console.log('GET review request successful:', res.data)
          let allreviews = res.data;
          allreviews.sort((a, b) => Date.parse(b.uploadDate) - Date.parse(a.uploadDate))
          this.setState({reviews: allreviews});
         })
        .catch(error => {
            console.log('GET reviews,pic number failed:', error)
        });
    };

    handleSubmit() {
      let searchedWord = this.state.searchedTerm;
      console.log(searchedWord)
      axios.get(`/reviews/restaurants/2?q=${searchedWord}`)
        .then(res => {
          console.log(res);
          this.setState({
            searchedTerm: searchedWord,
            searchedReviews: res.data,
          })
        })
        .catch(error => {
          console.log('failed to get searched reviews')
        })
    }

    handleChange(event) {
      this.setState({searchedTerm: event.target.value})
    }

    handleChangeSort(event) {
      const value = event.target.value;
      axios.get(`/reviews/restaurants/2?sort_by=${value}`)
        .then(res => {
          this.setState({
            reviews: res.data,
            sortValue: value
          })
        })
        .catch(error => {
          console.log(error);
          console.log('failed to get sorted reviews')
        })
    }

    handleSubmitClear() {
      axios.get('/reviews/restaurants/2')
        .then(res => {
          let allreviews = res.data;
          allreviews.sort((a, b) => Date.parse(b.uploadDate) - Date.parse(a.uploadDate))
          this.setState({
            searchedReviews: allreviews,
            searchedTerm: ''
          });
         })
        .catch(error => {
            console.log('GET reviews,pic number failed:', error)
        });
    }

    buttonSubmit(emoji, reviewID) {
      axios.post('/reviews/emoji', { emoji, reviewID })
        .then(res => {
          axios.get('/reviews/restaurants/2')
          .then(res => {
            let allreviews = res.data;
            allreviews.sort((a, b) => Date.parse(b.uploadDate) - Date.parse(a.uploadDate))
            this.setState({reviews: allreviews});
          })
          .catch(error => {
              console.log('GET reviews,pic number failed:', error)
          });
        })
        .catch(error => console.log(error))
    }



  render() {
    return (
      <div>
      <ReviewPage>
        <Recommended>
          <RecommendedDiv>
            <RecommendedText>Recommended Reviews</RecommendedText>
          </RecommendedDiv>
        </Recommended>
        <SearchReview handleSubmit={this.handleSubmit} searchedTerm={this.state.searchedTerm} handleChange={this.handleChange} sortValue={this.state.sortValue} handleChangeSort={this.handleChangeSort} searchedReviews={this.state.searchedReviews} handleSubmitClear={this.handleSubmitClear}/>
        <ReviewList allReviews={this.state.searchedTerm.length > 0 ? this.state.searchedReviews : this.state.reviews} numReviewsPics={this.state.userPicReviews}  buttonSubmit={this.buttonSubmit}/>
      </ReviewPage>
      </div>
    )
  }
}

export default App;