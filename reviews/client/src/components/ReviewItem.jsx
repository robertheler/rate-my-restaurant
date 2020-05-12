import React from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';

import Pictures from './Pictures';

const Table = styled.div `
  min-width: calc(100% + 2 * 16px);
  border-collapse: separate;
  display: table;
  table-layout: auto;
  border-color: #eeeeef;
  border-bottom: 1px solid #eeeeef;
  padding-bottom: 24px!important;
  margin-bottom: 24px!important;
`

const Left = styled.div `
  box-sizing: border-box;
  width: 33.33333%;
  border-spacing: 0;
  border-color: #eeeeef;
  display: table-cell;
  vertical-align: top;
`
const GridLeft = styled.div`
  display: grid;
  grid-template-columns: 1fr 2fr;
`

const ProfPic = styled.img `
  height: 60px;
  width: 50px;
  loading: lazy;
  border-radius: 4px;
  vertical-align: middle;
`

const Right = styled.div`
  box-sizing: border-box;
  display: table-cell;
  vertical-align: top;
  width: 66.66667%;
  border-collapse: collapse;
  border-spacing: 0;
  border-color: #eeeeef;
  margin-left: 8px;
  margin-right: 20px;
`
const UserName = styled.div `
  text-align: left;
  color: #00838f;
  font-weight: 700;
  font-family: Open Sans,Helvetica Neue,Helvetica,Arial,sans-serif;
  font-size: 14px;
  line-height: 20px;
`
const UserCity = styled.div `
  text-align: left;
  color: #2b273c;
  font-weight: 700;
  font-size: 12px;
  line-height: 18px;
  font-family: Open Sans,Helvetica Neue,Helvetica,Arial,sans-serif;
`
const UserText = styled.div `
  text-align: left;
  color: #2b273c;
  font-size: 12px;
  line-height: 18px;
  font-family: Open Sans,Helvetica Neue,Helvetica,Arial,sans-serif;
  font-weight: 400;
`
const MembershipColor = styled.div `
  text-align: left;
  color: #ff523d;
  font-weight: 400;
  font-size: 12px;
  line-height: 18px;
  font-family: Open Sans,Helvetica Neue,Helvetica,Arial,sans-serif;
`
const UserProfileIcon = styled.svg `
  width: 18px;
  height: 18px;
  fill: #f15c00;
  display: inline-block;
  vertical-align: middle;
  position: relative;
  top: -.1em;
  overflow: hidden;
  padding-right: 5px;
`
const ReviewStarDate = styled.div `
  margin-left: -8px;
  margin-right: -8px;
  border-collapse: separate;
  border-spacing: 8px 0;
  display: table;
  min-width: 100%;
  table-layout: auto;
  border-color: #eeeeef;
  margin-bottom: 5px;
`
const starPosition = {
  5: "0 -500px",
  4: "0 -480px",
  3: "0 -440px",
  2: "0 -400px",
  1: "0 -360px"
};

const StarSpan = styled.span `
  width: 108px;
  height: 20px;
  background: url(https://s3-media0.fl.yelpcdn.com/assets/public/stars_v2.yelp_design_web.yji-52d3d7a328db670d4402843cbddeed89.png) no-repeat;
  background-position: ${props => starPosition[props.stars]};
  background-size: 176px 680px;
  display: inline-block;
`
const StarImg = styled.img `
  clip: rect(0 0 0 0);
  position: absolute;
  left: -9999px;
  top: auto;
  overflow: hidden;
  width: 1px;
  height: 1px;
`
const PhotoCheckin = styled.div  `
  margin-bottom: 15px;
`
const PhotoNumber = styled.span`
  text-align: left;
  font-size: 12px;
  line-height: 18px;
  font-family: Open Sans,Helvetica Neue,Helvetica,Arial,sans-serif;
  font-weight: 400;
`
const PhotoIcon = styled.svg `
  width: 18px;
  height: 18px;
  fill: #666;
  overflow: hidden;
  display: inline-block;
  vertical-align: middle;
  position: relative;
  top: -.1em;
  overflow: hidden;
`
const UploadDate = styled.span`
  text-align: left;
  color: #757280;
  font-family: Open Sans,Helvetica Neue,Helvetica,Arial,sans-serif;
  font-weight: 400;
  font-size: 14px;
  line-height: 20px;
  padding-left: 10px;
`
const CheckinDate = styled.span`
  text-align: left;
  color: 757280;
  font-size: 12px;
  line-height: 18px;
  font-family: Open Sans,Helvetica Neue,Helvetica,Arial,sans-serif;
  font-weight: 400;
`
const CheckinIcon = styled.svg `
  width: 18px;
  height: 18px;
  fill: #0077bc;
  overflow: hidden;
  display: inline-block;
  vertical-align: middle;
  position: relative;
  top: -.1em;
  overflow: hidden;
  padding-left: 5px;
  padding-right: 5px;
`
const ReviewText = styled.div `
  color: #2b273c;
  font-family: Open Sans,Helvetica Neue,Helvetica,Arial,sans-serif;
  font-weight: 400;
  font-size: 14px;
  line-height: 20px;
  text-align: left;
  word-break: break-word!important;
  overflow-wrap: break-word!important;
  position: relative;
  border-color: #eeeeef;
  border-collapse: collapse;
  border-spacing: 0;
  margin-left: 24px;
  margin-right: 24px;
  box-sizing: border-box;
  display: table-cell;
  vertical-align: top;
  border-color: #eeeeef;
  margin-bottom: 15px;
`
const SeeAllPhotos = styled.div `
  font-size: 14px;
  line-height: 20px;
  color: #00838f;
  font-family: Open Sans,Helvetica Neue,Helvetica,Arial,sans-serif;
  text-decoration: none;
  margin-bottom: 20px;
`
const EmojiDiv = styled.div `
  margin-top: 20px;
  margin-bottom: 30px;
`
const EmojiIcon = styled.svg `
  width: 24px;
  height: 24px;
  display: inline-block;
  vertical-align: middle;
  position: relative;
  top: -.1em;
  overflow: hidden;
`
const EmojiText = styled.span `
  text-align: left;
  color: #757280;
  font-size: 12px;
  line-height: 18px;
  font-family: Open Sans,Helvetica Neue,Helvetica,Arial,sans-serif;
  font-weight: 400;
`
const EmojiButton = styled.button `
  --mousedown-x: 53px;
  --mousedown-y: 10.6719px;
  --button-width: 81.6563px;
  border: none;
  padding: 4px;
  height: auto;
  color: #2b273c;
  background: transparent;
  background-image: none;
  background-repeat: no-repeat;
  transition: all .8s;
`
const ReportFlagDiv = styled.div `
  position: relative;
  border-color: #eeeeef;
  display: inline-block;
`
const ReportFlagBox = styled.span `
  width: 18px;
  height: 18px;
  fill: currentColor;
  display: inline-block;
  vertical-align: middle;
  position: relative;
  top: -.1em;
  overflow: hidden;
`
const ReportFlag = styled.svg `
  overflow: hidden;
  position: absolute;
  width: 100%;
  height: 100%;
  fill: inherit;
  display: block;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  color: #757280;
  white-space: nowrap;
`
const ReplyBox = styled.div `
  display: block;
  border-collapse: collapse;
  border-spacing: 0;
  border-radius: 4px;
  background-color: #f4f4f4;
  border-color: #eeeeef;
  border-left: 1px solid #eeeeef;
  border-bottom: 1px solid #eeeeef;
  border-right: 1px solid #eeeeef;
  border-top: 1px solid #eeeeef;
  padding-bottom: 24px!important;
  padding-top: 24px!important;
  padding-right: 24px!important;
  padding-left: 24px!important;
`
const ReplyFrom = styled.span `
  text-align: left;
  color: #757280;
  font-weight: 700;
  font-size: 12px;
  line-height: 18px;
  font-family: Open Sans,Helvetica Neue,Helvetica,Arial,sans-serif;
`
const ReplyBullet = styled.span `
  color: #999!important;
  font-size: 10px!important;
  text-decoration: none!important;
  text-indent: -1px!important;
  display: inline-block!important;
  padding-left: 5px;
  padding-right: 5px;
`
const ReplyText = styled.span `
  text-align: left;
  color: #2b273c;
  font-family: Open Sans,Helvetica Neue,Helvetica,Arial,sans-serif;
  font-weight: 400;
  font-size: 14px;
  line-height: 20px;
`

const ReviewItem = (props) => (
  <Table>
    <Left>
      <GridLeft>
      <div>
        <ProfPic src={props.reviewItem.profPicURL} />
      </div>
      <div>
        <UserName>{props.reviewItem.userName}</UserName>
        <UserCity>{props.reviewItem.city}</UserCity>
        <UserText>
          <UserProfileIcon xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" class="icon_svg"><g><path d="M7.904 9.43l-2.098 4.697a.9.9 0 0 1-1.612 0L2.096 9.43a.902.902 0 0 1 .806-1.305h4.196c.67 0 1.105.705.806 1.305zM5 7.375a2 2 0 1 1 0-4 2 2 0 0 1 0 4z"></path><path d="M15.904 9.43l-2.098 4.697a.89.89 0 0 1-.806.498.89.89 0 0 1-.806-.498L10.096 9.43a.902.902 0 0 1 .806-1.305h4.195c.67 0 1.106.705.807 1.305zM13 7.375a2 2 0 1 1 0-4 2 2 0 0 1 0 4z" opacity=".502"></path></g>
          </UserProfileIcon>
          <b>{props.reviewItem.friendCount}</b> friends
        </UserText>
        <UserText>
          <UserProfileIcon xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" class="icon_svg"><path d="M13 3H5c-1.1 0-2 .9-2 2v8c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-1.505 9.643l-2.526-1.55L6.526 12.7 7 9.934 5 7.977l2.766-.404L8.97 4.7l1.264 2.873L13 7.977l-2 1.957.495 2.71z"></path></UserProfileIcon>
          <b>{props.reviewItem.reviews_count}</b> reviews
        </UserText>

          {
            props.reviewItem.pictures_count > 0 &&
            <UserText>
            <UserProfileIcon xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" class="icon_svg"><path d="M15 15H3a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2h2a2 2 0 0 1 2 2v7a2 2 0 0 1-2 2zM9 5a4 4 0 1 0 0 8 4 4 0 0 0 0-8zm0 6.5a2.5 2.5 0 1 1 0-5 2.5 2.5 0 0 1 0 5z"></path></UserProfileIcon>
            <b>{props.reviewItem.pictures_count}</b> photos
            </UserText>
          }

        {
          props.reviewItem.memberStatus &&
          <MembershipColor>{props.reviewItem.memberStatus}'{props.reviewItem.statusYear}</MembershipColor>
        }
      </div>
      </GridLeft>
    </Left>
    <Right>
    <ReviewStarDate>
      <div>
        <StarSpan stars={props.reviewItem.stars}>
          <StarImg src="https://s3-media0.fl.yelpcdn.com/assets/public/stars_v2.yelp_design_web.yji-52d3d7a328db670d4402843cbddeed89.png"/>
        </StarSpan>
        <UploadDate>{props.reviewItem.uploadDate}
        </UploadDate>
      </div>
    </ReviewStarDate>
    <PhotoCheckin>
      {
        props.reviewItem.pictures.length > 0 &&
        <PhotoNumber>
            <PhotoIcon xmlns="http://www.w3.org/2000/CheckinIcon" viewBox="0 0 18 18" class="icon_svg">
              <path d="M15 15H3a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2h2a2 2 0 0 1 2 2v7a2 2 0 0 1-2 2zM9 5a4 4 0 1 0 0 8 4 4 0 0 0 0-8zm0 6.5a2.5 2.5 0 1 1 0-5 2.5 2.5 0 0 1 0 5z">
              </path>
            </PhotoIcon> {props.reviewItem.pictures.length} photos
        </PhotoNumber>
      }
      {
        props.reviewItem.restaurantVisit > 0 &&
        <CheckinDate>
          <CheckinIcon xmlns="http://www.w3.org/2000/svg" width="18px" height="18px" viewBox="0 0 18 18" class="icon_svg" fill="#0077bc">
            <path d="M18 9l-2.136-1.84.932-2.66-2.772-.525-.524-2.77-2.66.93L8.997 0 7.163 2.136 4.5 1.206l-.525 2.77-2.77.524.932 2.66L0 9l2.137 1.84-.932 2.66 2.77.525.526 2.77 2.664-.932L8.998 18l1.84-2.137 2.662.932.524-2.77 2.772-.524-.932-2.66L18 9zm-9.85 3.23L5.324 9.4l1.13-1.13 1.698 1.696 3.396-3.395 1.13 1.134-4.525 4.525z">
            </path>
          </CheckinIcon>
            {props.reviewItem.restaurantVisit} check-in
        </CheckinDate>

      }
    </PhotoCheckin>
    <ReviewText>{props.reviewItem.content}</ReviewText>
    {
      props.reviewItem.pictures.map(picture => {
        return <Pictures picture={picture} restaurant={props.reviewItem.restaurantName}/>
      })
    }
    {
      props.reviewItem.pictures.length > 0 &&
      <SeeAllPhotos>
        See all photos from {props.reviewItem.userName} for {props.reviewItem.restaurantName}
      </SeeAllPhotos>
    }
    <EmojiDiv>
      <EmojiText>
        <EmojiButton type="button" onClick={() => props.buttonSubmit("emojiUseful", props.reviewItem.id)} >
          <EmojiIcon xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" class="icon_svg"><path d="M12 1a11 11 0 0 1 11 11c0 6.075-4.925 11-11 11S1 18.075 1 12 5.925 1 12 1zm0 20a9 9 0 1 0 0-18 9 9 0 0 0 0 18zm0-15.82a5.56 5.56 0 0 1 3 10.26V17a2 2 0 0 1-2 2h-2a2 2 0 0 1-2-2v-1.56a5.56 5.56 0 0 1 3-10.26zM11 17h2v-1h-2v1zm2.56-3a3.58 3.58 0 1 0-3.12 0h3.12z"></path>
          </EmojiIcon> Useful {props.reviewItem.emojiUseful}
        </EmojiButton>
      </EmojiText>
      <EmojiText>
        <EmojiButton type="button" onClick={() => props.buttonSubmit("emojiFunny", props.reviewItem.id)}>
          <EmojiIcon xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" class="icon_svg"><path d="M12 23C5.925 23 1 18.075 1 12S5.925 1 12 1s11 4.925 11 11a11 11 0 0 1-11 11zm0-20a9 9 0 1 0 0 18 9 9 0 0 0 0-18zm-4.5 8a1.5 1.5 0 0 1 3 0h-3zm6 0a1.5 1.5 0 0 1 3 0h-3zm-7.21 2h11.46a.26.26 0 0 1 .25.29c-.57 3.25-3 5.71-6 5.71s-5.43-2.46-5.96-5.71a.26.26 0 0 1 .25-.29z"></path>
          </EmojiIcon> Funny {props.reviewItem.emojiFunny}
        </EmojiButton>
      </EmojiText>
      <EmojiText>
        <EmojiButton type="button" onClick={() => props.buttonSubmit("emojiCool", props.reviewItem.id)}>
          <EmojiIcon xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" class="icon_svg"><path d="M12 23C5.925 23 1 18.075 1 12S5.925 1 12 1s11 4.925 11 11a11 11 0 0 1-11 11zm0-20a9 9 0 1 0 0 18 9 9 0 0 0 0-18zm-7.48 7.56a.43.43 0 0 1 .41-.56h14.14a.43.43 0 0 1 .41.56l-.85 2.53a3 3 0 0 1-2.8 2 3 3 0 0 1-2.8-2l-.28-.85a.8.8 0 0 0-.75-.54.8.8 0 0 0-.75.54l-.28.85a3 3 0 0 1-2.8 2 3 3 0 0 1-2.8-2l-.85-2.53zm3.18 5.63a16.3 16.3 0 0 0 8.6 0 .25.25 0 0 1 .26.39A5.71 5.71 0 0 1 12 19a5.71 5.71 0 0 1-4.56-2.42.25.25 0 0 1 .26-.39z"></path>
          </EmojiIcon> Cool {props.reviewItem.emojiCool}
        </EmojiButton>
      </EmojiText>
      {/* <ReportFlagDiv>
        <ReportFlagBox>
          <ReportFlag xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" class="icon_svg"><path d="M6 10V3c4.976 1.098 4.024-1 8 0v7c-4.024-.976-3.024 1.024-8 0zM4 2h1v14H4V2z"></path>
          </ReportFlag>
        </ReportFlagBox>
      </ReportFlagDiv> */}
    </EmojiDiv>
      {
        props.reviewItem.reply &&
        <ReplyBox>
          <ReplyFrom>Comment from {props.reviewItem.restaurantName}
          </ReplyFrom><br/>
          <ReplyText>{props.reviewItem.replyDate}<ReplyBullet> • </ReplyBullet>{props.reviewItem.reply}</ReplyText>
        </ReplyBox>
      }
    </Right>
  </Table>
);
export default ReviewItem;
