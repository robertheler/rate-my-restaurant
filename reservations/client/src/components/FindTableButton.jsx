import styled from 'styled-components';

const FindTableButton = styled.div`
  color: #fff;
  width: 297px;
  padding: 8px 16px;
  border: thin solid black;
  text-align: center;
  font-weight: 600;
  border: 1px solid #f43939;
  border-radius: 4px;
  clear: left;
  background: #f43939;
  cursor: pointer;
  &:hover {
    opacity: 0.8
  }
  &:active {
    -webkit-transform: scale(0.98);
  }
  -webkit-user-select: none;
   -khtml-user-select: none;
    -moz-user-select: none;
    -o-user-select: none;
    user-select: none;
`;

export default FindTableButton;
