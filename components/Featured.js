import Center from "@/components/Center";
import styled from "styled-components";
import Button from "@/components/Button";
import ButtonLink from "@/components/ButtonLink";
import CartIcon from "@/components/icons/CartIcon";
import {useContext} from "react";
import {CartContext} from "@/components/CartContext";
import { featuredBackground } from "@/lib/colors";
import { blockGap, radius } from "@/lib/vars";

const Bg = styled.div`
  background-color: ${featuredBackground};
  color:#222;
  padding: 50px 0;
  margin: 0 -20px;
  margin-top: ${blockGap};
`;
const Title = styled.h1`
  position: relative;
  margin:0;
  font-weight:normal;
  font-size:2rem;
  z-index: 3;
  @media screen and (min-width: 768px) {
    font-size:2rem;
    &::before{
      position: absolute;
      content: '';
      top: 0;
      left: -5px;
      display: flex;
      align-items: center;
      justify-content: center;
      width: 30px;
      height: 38px;
      background-color: #FD8888;
      z-index: -1;
  }
  }
`;
const SubTitle = styled.h2`
  margin: 20px 0 0px;
  padding: 0;
  font-weight:normal;
  font-size:2.5rem;
  @media screen and (min-width: 768px) {
    font-size:2.5rem;
  }
`;
const Desc = styled.p`
  color:#222;
  font-size:1.7rem;
  padding: 0;
  margin: 0;
`;
const ColumnsWrapper = styled.div`
  display: grid;
  justify-content: center;
  grid-template-columns: 1fr;
  gap: 20px;
  padding: 0 50px;
  img{
    max-width: 100%;
    max-height: 240px;
    display: block;
    margin: 0 auto;
  }
  div:nth-child(1) {
    order: 2;
  }
  @media screen and (min-width: 768px) {
    grid-template-columns: 1.1fr 0.9fr;
    div:nth-child(1) {
      order: 0;
    }
    img{
      max-width: 100%;
      border-radius: ${radius};
    }
  }
`;
const Column = styled.div`
  display: flex;
  align-items: center;
`;
const ButtonsWrapper = styled.div`
  display: flex;
  gap:10px;
  margin-top:25px;
`;
const Type = styled.div`
  font-size: 0.8rem;
  color: grey;
  margin: 0px 0 20px;
  padding-left: 3px;
`
export default function Featured({product}) {
  const {addProduct} = useContext(CartContext);
  function addFeaturedToCart() {
    addProduct(product?._id);
  }
  return (
    <Bg>
      <Center>
        <ColumnsWrapper>
          <Column>
            <div>
              <Title>Цікаве</Title>
              <SubTitle>{product?.title}</SubTitle>
              { product?.type === 'material'
                ? <Type>річь за вишивкою</Type>
                : <Type>електронний дизайн</Type>
              }
              <Desc>{product?.price} грн</Desc>
              <ButtonsWrapper>
                <ButtonLink href={'/product/'+product?._id} size={'l'} black={1}>Поцікавитись</ButtonLink>
                <Button white={1} primary={1} size={'l'} onClick={addFeaturedToCart}>
                  <CartIcon />
                  У кошик
                </Button>
              </ButtonsWrapper>
            </div>
          </Column>
          <Column>
            <img src={product?.images?.[0]} alt=""/>
          </Column>
        </ColumnsWrapper>
      </Center>

    </Bg>
  );
}