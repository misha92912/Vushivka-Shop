import Header from "@/components/Header";
import styled from "styled-components";
import Center from "@/components/Center";
import Button from "@/components/Button";
import {useContext, useEffect, useState} from "react";
import {CartContext} from "@/components/CartContext";
import axios from "axios";
import Table from "@/components/Table";
import Link from "next/link";
import Footer from "@/components/Footer";
import { signIn, useSession } from "next-auth/react";
import { radius } from "@/lib/vars";
import { featuredBackground, headerBackground, primary } from "@/lib/colors";

const ColumnsWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  @media screen and (min-width: 768px) {
    grid-template-columns: 1.2fr .8fr;
  }
  gap: 40px;
  margin-top: 40px;
`;

const Box = styled.div`
  background-color: ${featuredBackground};
  border-radius: ${radius};
  padding: 30px;
`;

const CheckoutBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background-color: #fff;
  border-radius: ${radius};
  padding: 30px;
`
const ProductInfoCell = styled.td`
  padding: 10px 0;
`;

const ProductImageBox = styled.div`
  width: 100px;
  min-height: 50px;
  padding: 2px;
  border: 1px solid rgba(0, 0, 0, 0.1);
  display:flex;
  align-items: center;
  justify-content: center;
  border-radius: ${radius};
  img{
    max-width: 100%;
    max-height: 100%;
  }
`;

const QuantityLabel = styled.span`
  padding: 0 15px;
  display: block;
  @media screen and (min-width: 768px) {
    display: inline-block;
    padding: 0 10px;
  }
`;
const CartTop =styled.div`
  display: flex;
  flex-direction: column;
  text-align: center;
  gap: 15px;
  @media screen and (max-width: 780px) {
    margin: 80px 0 0;
  }
  & h1 {
    margin: 20px 0 0;
  }
  & h3 {
    margin: 0;
    padding: 0;
  }
  & a {
    margin: 0 auto;
    max-width: 10rem;
  }
  & span {
    font-size: 1.3rem;
  }
`
const StyledLink = styled(Link)`
  display: flex;
  justify-content: center;
  background-color: ${headerBackground};
  color: white;
  font-size: 1.2rem;
  text-decoration: none;
  padding: 10px;
  border-radius: ${radius};
  &:hover{
    background-color: black;
  }
  &:active {
    background-color: ${primary};
  }
`
const SignUpButtons = styled.div`
  display: flex;
  gap: 10px;
  justify-content: space-between;
`

const Summa = styled.div`
  display: flex;
  justify-content: space-between;
`
const SuccesBox = styled.div`
  background-color: ${featuredBackground};
  padding: 30px;
  border-radius: ${radius};
  margin-top: 30px;
`
export default function CartPage() {
  const {cartProducts,addProduct,removeProduct,clearCart} = useContext(CartContext);
  const [products,setProducts] = useState([]);
  const [isSuccess,setIsSuccess] = useState(false);
  const [isIntangibleSuccess,setIsIntangibleSuccess] = useState(false);
  const [isMaterialSuccess,setIsMaterialSuccess] = useState(false);
  const { data: session } = useSession(); 

  const intangibleProducts = products.filter(p => p.type === 'intangible');
  const intangibleIds = intangibleProducts.map(p => p._id);
  const intangibleProductsIds = cartProducts.filter(id => intangibleIds.includes(id))
  const materialProducts = products.filter(p => p.type === 'material');
  const otherProducts = products.filter(p => p.type !== 'material' && p.type !== 'intangible');
  
  let intangibleTotal = 0;
  let materialTotal = 0;
  let otherTotal = 0;
  let total = 0;
  let name, surname, email
  if(!!session) {
    email = session.user.email;
    name = session.user.name.split(' ')[0];
    surname = session.user.name.split(' ')[1];

  }

  useEffect(() => {
    if (cartProducts.length > 0) {
      axios.post('/api/cart', {ids:cartProducts})
        .then(response => {
          setProducts(response.data);
        })
    } else {
      setProducts([]);
    }
  }, [cartProducts]);

  //materialize
  useEffect(() => {
    if (typeof window === 'undefined') {
      setIsSuccess(false);
      return;
    }
    if (window?.location.href.includes('success')) {
      setIsMaterialSuccess(true);
      setIsIntangibleSuccess(false);
    } else if (window?.location.href.includes('added')) {
      setIsIntangibleSuccess(true);
      setIsMaterialSuccess(false);
    } else {
      setIsIntangibleSuccess(false);
      setIsMaterialSuccess(false);
    }
  }, []);

  function moreOfThisProduct(id) {
    addProduct(id);
  }
  function lessOfThisProduct(id) {
    removeProduct(id);
  }

  async function addToUser() {
    const response = await axios.post('/api/checkout', {
      name: name || 'noname', 
      surname: surname || 'noname',
      middlename:'',
      email: email || 'unregister',
      phone:'noneed phone',
      city:'noneed',
      warehouse:'noneed',
      delivery:'noneed',
      payment:false,
      intangibleProductsIds
    });
    clearCart(intangibleProductsIds);
  if (response.data.url) {
    window.location = response.data.url;
  }};
  for (const productId of cartProducts) {
    const intangiblePrice = intangibleProducts.find(p => p._id === productId)?.price || 0;
    intangibleTotal += intangiblePrice;
  
    const materialPrice = materialProducts.find(p => p._id === productId)?.price || 0;
    materialTotal += materialPrice;
  
    const otherPrice = otherProducts.find(p => p._id === productId)?.price || 0;
    otherTotal += otherPrice;
  
    const price = products.find(p => p._id === productId)?.price || 0;
    total += price;
  }
  return (
    <>
      <Header />
      <main>
        <Center>
          <CartTop>
            <h1>Кошик</h1>
            {!!cartProducts.length 
              ? (<StyledLink onClick={()=>clearCart()} href={'#'}>Очистити кошик</StyledLink>)
              : null
            }
            {!cartProducts.length && (
              <h3>Поки що порожній</h3>
            )}
            {total ? <span>Загалом: {total} грн</span> : null}
          </CartTop>
          {isMaterialSuccess && !materialProducts.length && (
            <SuccesBox>
            <h1>Дякуемо за замовлення!</h1>
            <p>Очікуйте на дзвінок від нашого сайту</p>
            </SuccesBox>
          )}
          {materialProducts.length > 0 && (<ColumnsWrapper>
            <Box>
              <h2>Речі з вишивкою</h2>
              <Table>
                <thead>
                  <tr>
                    <th>Назва</th>
                    <th></th>
                    <th>Кількість</th>
                    <th>Ціна</th>
                  </tr>
                </thead>
                <tbody>
                  {materialProducts.map(product => 
                    {
                      const properties = [];
                      if (product?.properties) {
                        for (const [key, value] of Object.entries(product?.properties)) {
                          properties.push({key: key, value: value})
                        }
                      }
                      return(
                      <tr key={product._id}>
                        <ProductInfoCell>
                          {product.title}
                          <ProductImageBox>
                            <img src={product.images[0]} alt=""/>
                          </ProductImageBox>
                        </ProductInfoCell>
                        <td>
                        {properties.length > 0 && properties.map(p => (
                          <p key={p.key}>{p.key} {p.value}</p>
                        ))}
                        </td>
                        <td>
                          <Button
                            onClick={() => lessOfThisProduct(product._id)}>-</Button>
                          <QuantityLabel>
                            {cartProducts.filter(id => id === product._id).length}
                          </QuantityLabel>
                          <Button
                            onClick={() => moreOfThisProduct(product._id)}>+</Button>
                        </td>
                        <td>
                          {cartProducts.filter(id => id === product._id).length * product.price} грн
                        </td>
                      </tr>
                    )}
                  )}
                  <tr>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td>{materialTotal} грн</td>
                  </tr>
                </tbody>
              </Table>
            </Box>
            <CheckoutBox>
              <table>
                <thead><tr><td><h3>Сумма замовлення</h3></td></tr></thead>
                <tbody>
                    {materialProducts.map(product => (
                          <tr key={product._id}>
                            <ProductInfoCell>
                              {product.title}
                            </ProductInfoCell>
                            <td>
                              <QuantityLabel>
                                {cartProducts.filter(id => id === product._id).length} шт.
                              </QuantityLabel>
                            </td>
                            <td>
                              {cartProducts.filter(id => id === product._id).length * product.price} грн
                            </td>
                          </tr>
                        ))}
                </tbody>
              </table>
              <div>
                <Summa>
                  <h3>Усього</h3>
                  <h3>{materialTotal} грн</h3>
                </Summa>
                
                <StyledLink href={'/checkout'}>
                  Перейти до замовлення
                </StyledLink>
              </div>
            </CheckoutBox>
          </ColumnsWrapper>)}
          {isIntangibleSuccess && !intangibleProductsIds.length && (
            <SuccesBox>
            <h1>Готово!</h1>
            <p>Електронні дизайни додано до персональної сторінки</p>
            </SuccesBox>
          )}
          {intangibleProductsIds?.length > 0 && (<ColumnsWrapper>
            <Box>
              <h2>Електронні дизайни</h2>
              <Table>
                <thead>
                  <tr>
                    <th>Назва</th>
                    <th>Ціна</th>
                    <th>видалити</th>
                  </tr>
                </thead>
                <tbody>
                  {intangibleProducts.map(product => (
                    <tr key={product._id}>
                      <ProductInfoCell>
                        {product.title}
                        <ProductImageBox>
                          <img src={product.images[0]} alt=""/>
                        </ProductImageBox>
                      </ProductInfoCell>
                      
                      <td>
                        {cartProducts.filter(id => id === product._id).length * product.price} грн
                      </td>
                      <td>
                        <Button black
                          onClick={() => lessOfThisProduct(product._id)}>X</Button>
                      </td>
                    </tr>
                  ))}
                  <tr>
                    <td></td>
                    <td>{intangibleTotal} грн</td>
                    <td></td>
                  </tr>
                </tbody>
              </Table>
            </Box>
            <Box>
              <h2>Данні замовлення</h2>
              {!email?.length > 0 
                ? (
                <> <h3>Зареєструватися/увійти для придбання та завантаження</h3>
                <SignUpButtons>
                  <Button size={'l'} inline primary onClick={()=>signIn()}
                          >
                    Вхід з Google аккаунту
                  </Button>
                </SignUpButtons>
                </>
                ) 
                : (
                  <>
                    <CheckoutBox>
                      {email}
                    <i>Придбані електронні дизайни можна завантажити в персональному кабінеті</i>
                    </CheckoutBox>
                      <StyledLink href={'#'}
                        onClick={addToUser}>
                        Замовити
                      </StyledLink>
                  </>
                )}
            </Box>
          </ColumnsWrapper>)}
          {otherProducts?.length > 0 && (<ColumnsWrapper>
            <Box>
              <h2>Інші товари</h2>
              {!otherProducts?.length && (
                <div>Ваш кошик порожній</div>
              )}
              {otherProducts?.length > 0 && (
                <Table>
                  <thead>
                    <tr>
                      <th>Назва</th>
                      <th>Кількість</th>
                      <th>Ціна</th>
                    </tr>
                  </thead>
                  <tbody>
                    {otherProducts.map(product => (
                      <tr key={product._id}>
                        <ProductInfoCell>
                          <ProductImageBox>
                            <img src={product.images[0]} alt=""/>
                          </ProductImageBox>
                          {product.title}
                        </ProductInfoCell>
                        <td>
                          <Button
                            onClick={() => lessOfThisProduct(product._id)}>-</Button>
                          <QuantityLabel>
                            {cartProducts.filter(id => id === product._id).length}
                          </QuantityLabel>
                          <Button
                            onClick={() => moreOfThisProduct(product._id)}>+</Button>
                        </td>
                        <td>
                          ${cartProducts.filter(id => id === product._id).length * product.price}
                        </td>
                      </tr>
                    ))}
                    <tr>
                      <td></td>
                      <td></td>
                      <td>${otherTotal}</td>
                    </tr>
                  </tbody>
                </Table>
              )}
            </Box>
            {!!otherProducts?.length && (
              <Box>
                <h2>Ці товари покищо не можна купити</h2>
              </Box>
            )}
          </ColumnsWrapper>)}
        </Center>
      </main>
      <Footer></Footer>
    </>
  );
}
