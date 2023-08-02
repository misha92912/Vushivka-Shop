import styled from "styled-components";
import Button from "@/components/Button";
import Link from "next/link";
import {useContext} from "react";
import {CartContext} from "@/components/CartContext";
import { radius } from "@/lib/vars";

const ProductWrapper = styled.div`
  display: flex;
  width: 200px;
  flex-direction: column;
  justify-content: space-between;
  padding: 5px;
  border-radius: ${radius};
  overflow: hidden;
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
  transition: 300ms;
  &:hover {
    transform: scale(1.02);
  }
`;

const WhiteBox = styled(Link)`
  max-height: 150px;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: ${radius};
  overflow:hidden;
  div {
    min-height: 100px;
  }
  img{
    max-width: 100%;
  }
`;

const Title = styled(Link)`
  display: block;
  font-weight: normal;
  font-size: 1.1rem;
  color:inherit;
  text-decoration:none;
  margin:0;
  text-align: center;
  min-width: 100%;
`;

const ProductInfoBox = styled.div`
  margin-top: 5px;
`;

const PriceRow = styled.div`
display: flex;
gap: 5px;
align-items: center;
justify-content:space-between;
margin: 20px 5px 0;
  & i {
    font-size: 14px;
  }
`;

const Price = styled.div`
  font-size: 1.2rem;
  font-weight:600;
  text-align: left;
  inline-size: 100px;
  overflow-wrap: break-word;
`;
const Type = styled.div`
  font-size: 0.8rem;
  color: grey;
  text-align: center;
`

const ProductBox = ({_id, title, price, images, type}) => {
    const {addProduct, addCifralProduct} = useContext(CartContext);
    const url = '/product/'+_id;
    return (
    <ProductWrapper>
      <WhiteBox href={url}>
        <div>
          <img src={images?.[0]} alt=""/>
        </div>
      </WhiteBox>
      <ProductInfoBox>
        <Title href={url}>{title}</Title>
        { type === 'material'
          ? <Type>річь з вишивкою</Type>
          : <Type>електронний дизайн</Type>
        }
        <PriceRow>
          {price > 0.01 
            ? <Price>
                  {price} грн
              </Price>
          : <i>Безкоштовно</i>
          }
        <Button block={1} primary={1} sm={1} 
                onClick={() => {type === 'material' 
                    ? addProduct(_id) 
                    : addCifralProduct(_id)}} >
          У кошик
        </Button>
        </PriceRow>
      </ProductInfoBox>
    </ProductWrapper>
  )
}

export default ProductBox