import React from 'react';
import styled from 'styled-components';

const UserInfoContainer = styled.div`
    border: 1px solid white;
    position: absolute;
    right: 0;
    bottom: 0;
    left: 0;
    padding: 3px 6px;
    border-radius: 0 0 4px 4px;
    background: #333;
    background: rgba(0,0,0,.5);
    font-size: 14px;
    line-height: 1.5em;
    overflow: hidden;
    -webkit-transition: all .3s ease-in-out;
    transition: all .3s ease-in-out;
    -webkit-backface-visibility: hidden;
    backface-visibility: hidden;
    
`;

const UserInfo = (props) => {
    return(
        <UserInfoContainer>
            <div className="userInfo">
                <span>{props.userInfo[0].userName.charAt(0).toUpperCase()+props.userInfo[0].userName.slice(1)}</span>
            </div>
            <div className="moreInfo">
                
            </div>
        </UserInfoContainer>
    );
}

export default UserInfo;