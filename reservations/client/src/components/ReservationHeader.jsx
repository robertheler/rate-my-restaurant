import styled from 'styled-components';
import React from 'react';

const ReservationHeaderBox = styled.div`
  width: 329px;
  height: 26px;
  font-weight: 700;
  color: #2b273c;
  font-size: 20px;
  margin-bottom: 16px;
`;

const ReservationHeader = (props) => (
  <ReservationHeaderBox>Make a Reservation</ReservationHeaderBox>
);

export default ReservationHeader;
