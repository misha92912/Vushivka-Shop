import styled from "styled-components"
import LogoIcon from "./icons/LogoIcon"
import Link from "next/link"
import {width} from "@/lib/vars"
import { headerActionText, headerBackground, headerText } from "@/lib/colors"
import Phonenumber from "./Phonenumber"

const StyledFooter = styled.footer`
  display: flex;
  flex-direction: column;
  background-color: ${headerBackground};
  color: ${headerText};
  margin-top: 50px;
` 
const UpperFooter = styled.div`
  align-self: center;
  display: block;
  max-width: ${width};
  width: 80%;
  padding: 10px 0;
`
const BottomFooter = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 5px;
  background-color: #000;
  color: white;
`
const FooterInfo = styled.div`
  display: flex;
  gap: 10px;
  justify-content: space-between;
  @media screen and (max-width: 768px) {
    & div:last-child{
      display: none;
    }
  }
  
`
const InfoColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`

const StyledLink = styled(Link)`
  position: relative;
  text-decoration: none;
  color: ${headerText};
  transition: 100ms;
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
    border: 2px solid #000;
    border-radius: 5px;
    padding: 0.4rem;
  }
`

const Footer = () => {
  
  return (
    <StyledFooter>
      <>
        <UpperFooter>
          <FooterInfo>
            <StyledLink href={'/'}><LogoIcon /></StyledLink>
            <InfoColumn>
              <StyledLink href={'/about-us'}>Про нас</StyledLink>
              <StyledLink href={'/about-delivery'}>Доставка та оплта</StyledLink>
            </InfoColumn>
            <InfoColumn>
              <StyledLink href={'/povernennya'}>Повернення/заміна</StyledLink>
              <StyledLink href={'/contacts'}>Контакти</StyledLink>
            </InfoColumn>
            <InfoColumn>
              <Phonenumber>
                +38(000)-123-4567
              </Phonenumber>
              <Phonenumber>
                +38(000)-123-4567
              </Phonenumber>
            </InfoColumn>
          </FooterInfo>
        </UpperFooter>
      </>
      <BottomFooter>Copyright 2023 ©</BottomFooter>
    </StyledFooter>
  )
}

export default Footer