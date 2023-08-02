import Link from "next/link";
import styled, { css } from "styled-components";
import Center from "@/components/Center";
import {useContext, useState} from "react";
import {CartContext} from "@/components/CartContext";
import BarsIcon from "@/components/icons/Bars";
import { headerActionText, headerBackground, headerText, primary } from "@/lib/colors";
import CartGreyIcon from "./icons/CartGreyIcon";
import LogoIcon from "./icons/LogoIcon";
import {useRouter} from "next/router"
import Find from "./Find";

const StyledHeader = styled.header`
  background-color:  ${headerBackground};
`;
const Logo = styled(Link)`
  color:#222;
  font-size: 1.2rem;
  text-decoration:none;
  position: relative;
  z-index: 3;
  margin-left: 20px;
  
  @media screen and (max-width: 780px) {
    margin-left: 50px;
  }
`;
const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 5px 0;
  box-sizing: border-box;
  
  @media screen and (max-width: 780px) {
    display: flex;
    position: fixed;
    align-items: center;
    width: 100vw;
    height: 80px;
    background-color: ${headerBackground};
    z-index: 99;
    top: 0;
    left: 0;
  }
`;
const StyledNav = styled.nav`
  ${props => props.mobileNavActive ? `
    display: block;
  ` : `
    display: none;
  `}
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 70px 20px  0px;
  background-color: ${headerBackground};
  @media screen and (min-width: 781px) {
    display: flex;
    position: static;
    gap: 25px;
    justify-content: center;
    align-items: center;
    padding: 0;
  }
`;
const NavLink = styled(Link)`
  display: block;
  max-width: max-content;
  color:${headerText};
  font-size: 1.5rem;
  text-decoration:none;
  padding: 20px 0 5px;
  -moz-user-select: none;
  -khtml-user-select: none;
  user-select: none;
  transition: 100ms;
    &:hover{
        transform: scale(1.01);
    }
  @media screen and (max-width: 950px) {
    font-size: 1.2rem;
  }
  ${props => props.active && css`
    position: relative;
    color: ${headerActionText};
  `}
`;
const NavButton = styled.button`
  background-color: transparent;
  gap: 10px;
  width: 50px;
  height: 50px;
  margin-right: 50px;
  border:0;
  color: ${headerText};
  cursor: pointer;
  position: relative;
  z-index: 3;
  @media screen and (min-width: 781px) {
    display: none;
  }
`;

export default function Header() {
  const {cartProducts} = useContext(CartContext);
  const [mobileNavActive,setMobileNavActive] = useState(false);
  const router = useRouter();
  const {pathname} = router;
  const toggler = rout => pathname === rout;

  return (
    <StyledHeader>
      <Center>
        <Wrapper>
          <Logo href={'/'}><LogoIcon/></Logo>
          <StyledNav mobileNavActive={mobileNavActive}>
            <NavLink href={'/'} active={toggler('/') ? 1 : null}>ГОЛОВНА</NavLink>
            <NavLink href={'/products'} active={toggler('/products') ? 1 : null}>ТОВАРИ</NavLink>
            <NavLink href={'/profile'} active={toggler('/profile') ? 1 : null}>ПРОФІЛЬ</NavLink>
            <NavLink href={'/cart'} active={toggler('/cart') || toggler('/checkout') ? 1 : null}>КОШИК</NavLink>
          </StyledNav>
          <StyledNav>
            <Find />
            <NavLink href={'/cart'}><CartGreyIcon num={cartProducts.length}/></NavLink>
          </StyledNav>
          <NavButton onClick={() => setMobileNavActive(prev => !prev)}>
            <BarsIcon />
          </NavButton>
        </Wrapper>
      </Center>
    </StyledHeader>
  );
}