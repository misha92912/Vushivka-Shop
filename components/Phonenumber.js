import { headerActionText, headerText } from '@/lib/colors';
import React, { useState } from 'react'
import styled from 'styled-components';

const StyledPhone = styled.div`
  position: relative;
  text-decoration: none;
  color: ${headerText};
  transition: 100ms;
  cursor: pointer;
  &:hover{
      transform: scale(1.02);
  color: ${headerActionText};
  }
  & span {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: max-content;
    height: max-content;
    background-color: white;
    color: black;
    border: 2px solid #000;
    border-radius: 5px;
    padding: 0.4rem;
  }
`

const Phonenumber = ({children}) => {
  const [copied, setCopied] = useState(false);

  function copyNumber (e) {
    e.preventDefault()
    navigator.clipboard.writeText(e.target.innerText);
    setCopied(true);
    setTimeout(() => setCopied(false), 300);
  }
  return (
  <StyledPhone onClick={(e) => copyNumber(e)}>
    {children}
    {copied ? <span>Copied!</span> : null}
  </StyledPhone>
  )
}

export default Phonenumber