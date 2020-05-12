import styled from 'styled-components';

const determineColor = (props) => {
  if (props.selected) {
    return '#fff';
  }
  if (props.past) {
    return '#cfced5';
  }
  return 'inherit';
};

const determineBorder = (props) => {
  if (props.selected) {
    return '1.5px solid white';
  }
  if (props.isToday) {
    return '1.5px solid #eeeeef';
  }
  return '1.5px solid white';
};

const CalendarDate = styled.td`
  width: 30px;
  height: 30px;
  border: ${determineBorder};
  border-radius: 50%;
  text-align: center;
  cursor: default;
  background: ${(props) => (props.selected ? '#f43939' : 'inherit')};
  color: ${determineColor};
  :hover {
    background: ${(props) => (props.selected ? '#f43939' : '#f0f3f8')};
    cursor: pointer;
  }
  pointer-events: ${(props) => (props.past ? 'none' : 'auto')}
`;

export default CalendarDate;
