import styled, {css} from "styled-components";
import {headerBackground, primary, primaryActive} from "@/lib/colors";
import { radius } from "@/lib/vars";

export const ButtonStyle = css`
  border:0;
  padding: 5px 15px;
  border-radius: ${radius};
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  text-decoration: none;
  font-family: 'Poppins', sans-serif;
  font-weight:500;
  transition: 100ms;
  -moz-user-select: none;
  -khtml-user-select: none;
  user-select: none;
  &:hover {
    transform: scale(1.01);
  }
  &:active {
    
    filter: brightness(1);
    transform: scale(0.95);
  }
  svg{
    height: 16px;
    margin-right: 5px;
  }
  ${props => props.block && css`
    display: block;
    width: 100%;
    text-align: center;
  `}
  ${props => props.inline && css`
    display: inline-block;
    width: 100%;
  `}
  ${props => props.white && !props.outline && css`
    background-color: #fff;
    color: #000;
  `}
  ${props => props.white && props.outline && css`
    background-color: transparent;
    color: black;
    border: 1px solid black;
  `}
  ${props => props.black && !props.outline && css`
    background-color: ${headerBackground};
    color: #fff;
  `}
  ${props => props.black && props.outline && css`
    background-color: transparent;
    color: #000;
    border: 1px solid ${headerBackground};
  `}
  ${props => props.primary && !props.outline && css`
    background-color: ${primary};
    border: 1px solid ${primary};
    color:#fff;
    &:hover {
      background-color: ${primaryActive};
    }
  `}
  ${props => props.primary && !props.outline && props.sm && css`
    background-color: ${primary};
    border: 1px solid ${primary};
    color:#fff;
    width: max-content;
    &:hover {
      background-color: ${primaryActive};
    }
  `}
  ${props => props.primary && props.outline && css`
    background-color: transparent;
    border: 1px solid ${primary};
    color:${primary};
  `}
  ${props => props.size === 'l' && css`
    font-size:1.2rem;
    padding: 10px 20px;
    svg{
      height: 20px;
    }
  `}
`;

const StyledButton = styled.button`
  ${ButtonStyle}
`;

export default function Button({children,...rest}) {
  return (
    <StyledButton {...rest}>{children}</StyledButton>
  );
}