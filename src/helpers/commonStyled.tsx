import styled from 'styled-components';

export const Btn = styled.button`
  width: 150px;
  height: 50px;
  border-radius: 3px;
  border: none;
  cursor: pointer;
  font-weight: 600;
  font-size: 24px;
  color: gray;
  background: #ffff99;
  text-transform: uppercase;
  transition: all 150ms linear;
  &:hover,
  &:active {
    background: #ffff00;
    color: #0099cc;
  }
`;
