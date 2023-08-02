import Center from "@/components/Center";
import Header from "@/components/Header";
import {mongooseConnect} from "@/lib/mongoose";
import {Product} from "@/models/Product";
import styled from "styled-components";
import WhiteBox from "@/components/WhiteBox";
import ProductImages from "@/components/ProductImages";
import Button from "@/components/Button";
import CartIcon from "@/components/icons/CartIcon";
import {useContext} from "react";
import {CartContext} from "@/components/CartContext";
import Footer from "@/components/Footer";
import { Category } from "@/models/Categories";
import { radius } from "@/lib/vars";
import { useRouter } from "next/router";
import { primaryActive } from "@/lib/colors";

const ColWrapper = styled.div`
  display: grid;
  grid-template-columns: .8fr 1.2fr;
  @media screen and (max-width: 768px) {
    margin-top: 100px;
    grid-template-columns: 1fr;
  }
  gap: 40px;
  margin: 40px 0;
`;
const InfoBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`
const Top = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`
const Back = styled.div`
  width: 80px;
  height: max-content;
  padding: 5px;
  background: lightgrey;
  color: black;
  text-align: center;
  border-radius: ${radius};
  transition: 100ms;
  -moz-user-select: none;
  -khtml-user-select: none;
  user-select: none;
  cursor: pointer;
  &:hover{
    background-color: black;
    color: white;
    transform: scale(1.05);
  }
  &:active {
    background-color: black;
    color: white;
    transform: scale(0.95);
  }
`
const PriceRow = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  @media screen and (max-width: 768px) {
    justify-content: flex-end;
  }
`;
const Price = styled.span`
  font-size: 1.6rem;
  font-weight: 600;
  color: ${primaryActive};
`;
const Properties = styled.div`
  margin-top: 20px;
  padding-top: 30px;
  border-top: 1px solid lightgrey;
  & div {
    display: flex;
    width: 200px;
    justify-content: space-between;
  }
  & div p {
    padding: 0;
    margin: 0;
  }
`
export default function ProductPage({product, categories}) {
  const {addProduct, addCifralProduct} = useContext(CartContext);
  const router = useRouter()

  const properties = [];
  if (product?.properties) {
    for (const [key, value] of Object.entries(product?.properties)) {
      properties.push({key: key, value: value})
    }
  }
  return (
    <>
      <Header />
      <main>
        <Center>
          <ColWrapper>
            <WhiteBox>
              <ProductImages images={product.images} />
            </WhiteBox>
            <InfoBox>
              <div>
                <Top>
                  <h1>{product.title}</h1>
                  <Back onClick={() => router.back()}>назад</Back>
                  </Top>
                <Price>{product.price} грн</Price>
              </div>
              <p>{product.description}</p>
              <PriceRow>
                <div>
                  <Button primary={1} size={'l'}
                          onClick={() => {product.type === 'material' 
                            ? addProduct(product._id) 
                            : addCifralProduct(product._id)}} >
                    <CartIcon />У кошик
                  </Button>
                </div>
              </PriceRow>
              {properties.length > 0 && properties.map(p => (
                <Properties key={p.key}>
                  <div>
                    <b>{p.key}</b> 
                    <i>{p.value}</i>
                  </div>
                </Properties>
              ))}
            </InfoBox>
          </ColWrapper>
        </Center>
      </main>
      <Footer />
    </>
  );
}

export async function getServerSideProps(context) {
  await mongooseConnect();
  const {id} = context.query;
  const product = await Product.findById(id);
  const category = await Category.find({})
  return {
    props: {
      product: JSON.parse(JSON.stringify(product)),
      categories: JSON.parse(JSON.stringify(category)),
    }
  }
}