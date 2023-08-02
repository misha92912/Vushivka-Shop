import React, { useContext, useEffect, useState } from 'react'
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { signOut, useSession } from "next-auth/react";
import styled, { css } from 'styled-components';
import Center from '@/components/Center';
import { mongooseConnect } from '@/lib/mongoose';
import { CartContext } from '@/components/CartContext';
import { Product } from '@/models/Product';
import ProductCifralBox from '@/components/ProductCifralBox';
import UserIcon from '@/components/icons/UserIcon';
import { featuredBackground, headerActionText, headerBackground } from '@/lib/colors';
import { radius } from '@/lib/vars';
import Ok from '@/components/icons/Ok';
import NeOk from '@/components/icons/NeOk';
import axios from 'axios';

const inOrderGap = '10px';

const UserView = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 100%;
  @media screen and (max-width: 780px){
    margin-top: 70px;
  }
  & main {
    width: 100%;
    border-radius: 10px;
    outline: 1px solid #000;
    padding: 10px;
  }
`
const UserNav = styled.div`
  display: grid;
  grid-template-columns: max-content max-content max-content;
  
  margin: 30px auto 0;
  gap: 20px;
  @media screen and (max-width: 680px){
    grid-template-columns: 1fr;
  }
  div:nth-child(1) {
    order: 3;
    width: 15rem;
    height: 40px;
    @media screen and (max-width: 680px){
     order: 2;
    } 
  }
  div:nth-child(3){
    order: 1;
    width: 15rem;
    height: 40px;
  }
  div:nth-child(2){
    order: 2;
  }
  div:nth-child(2){
    width: 80px;
    height: 40px;
    @media screen and (max-width: 680px){
     order: 3;
     justify-self: center;
    } 
  }
`
const UserNavItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background:  ${headerBackground};
  text-transform: uppercase;
  text-align: center;
  color: white;
  border-radius: ${radius};
  padding: 10px;
  cursor: pointer;

  ${props => props.active && css`
    color: ${headerActionText};
  `}
  & span:nth-child(1){
    position: relative;
  }
  & span:nth-child(2){
    display: none;
    position: absolute;
    ${props => props.active && css`
      left: 50%;
      transform: translate(-50%, 70px);
      padding: 10px;
      display: block;
      width: max-content;
      background: ${headerBackground};
      color: white;
      & span {
        text-align: center;
        & p {
          padding: 5px 0;
          margin: 0;
          &:hover {
            outline: 1px solid white;
            color: ${headerActionText};
          }
        }
      }
    `}
  }
`
const OrdersContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column-reverse;
  gap: ${inOrderGap};
`
const OrdersRow = styled.div`
  display: flex;
  gap: ${inOrderGap};
  background: ${featuredBackground};
  border-radius: ${radius};
  padding: 20px;
  @media screen and (max-width: 680px){
    flex-direction: column-reverse;
  }
`
const UserInfoInOrder = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${inOrderGap};
`
const InfoHeader = styled.div`
  display: flex;
  gap: ${inOrderGap};
  div {
    border: 1px solid #000;
    border-radius: ${radius};
    display: flex;
    flex: 1 1 auto;
    width: 6rem;
    justify-content: center;
    align-items: center;
    padding: 20px;
    @media screen and (max-width: 680px){
      width: 100%;
    }
    @media screen and (max-width: 400px){
      flex-direction: column;
      svg {
        margin-bottom: 5px;
      }
    }
    svg {
      min-width: 20px;
      min-height: 20px;
      margin-right: 5px;
    }
    span {
      text-align: center;
    }
  }
`
const InfoMain = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
  padding: 20px;
  border: 1px solid #000;
  border-radius: ${radius};
`
const OrderContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
  border: 1px solid #000;
  border-radius: ${radius};
  padding: 20px;
  @media screen and (min-width: 680px){
      width: 100%;
    }
  div {
    display: grid;
    grid-template-columns: 1fr 100px 100px;
    span:nth-child(2) {
      justify-self: center;
    }
    @media screen and (max-width: 400px){
      grid-template-columns: 1fr 50px 100px;
    }
  }
`
const StyledProductsGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  justify-items: center;
  margin-top: 80px;
  gap: 30px;
  background: ${featuredBackground};
  padding: 20px;
  border-radius: ${radius};
  @media screen and (min-width: 600px) {
    margin-top: 0px;
    grid-template-columns: 1fr 1fr;
  }
  @media screen and (min-width: 768px) {
    margin-top: 0px;
    grid-template-columns: 1fr 1fr 1fr 1fr ;
    
  }
`;
const Button = styled.div`
  padding: 10px;
  background: ${headerBackground};
  color: white;
  text-align: center;
  &:hover{
    background: black;
  } 
`

// const profile = ({products, orders}) => {
const profile = ({products}) => {
  const {users, userMail, setUserMail, userId, setUserId} = useContext(CartContext);
  const { data: session } = useSession();
  const [whatToShow, setWhatToShow] = useState(2) 
  const [showUserInfo, setShowUserInfo] = useState(false);
  const [orders, setOrders] = useState([]);
  const userOrders = [];
  const cifralIds = [];
  const ordersCifralId = [];
  const userCifralProducts = [];

  useEffect(()=>{
    axios.get('/api/orders').then(responce => {
      setOrders(responce.data);
    });
  },[])

  if (!!session?.user.email) {
    // cifral products
    products.forEach(prod => {
      prod.type==='intangible'
        ? cifralIds.push(prod._id)
        : null;
    });

    // orders
    orders.forEach(order => {
      order.email === session.user.email
        ? userOrders.unshift(order)
        : null;
      order.line_items.forEach(item => {
        if( cifralIds.includes(item.product_id)
            &&
            order.email === session.user.email
            && 
            ( item.price_data.unit_amount == 0 || order.paid )
          ){
            ordersCifralId.push(item.product_id)
          }
          
      })
    });

    // user prods
    products.forEach(prod => {
      ordersCifralId.includes(prod._id)
        ? userCifralProducts.push(prod)
        : null;
    });
  }
  const deleteOrder = (_id) => {
    axios.delete('/api/orders', { params:{_id: _id} }).then(response => {
      axios.get('/api/orders').then(responce => {
        setOrders(responce.data);
      });
    })
  }
  return (
    <>
      <Header />
      <main>
        <Center>
          <UserView>
            <UserNav>
              <UserNavItem onClick={()=>setWhatToShow(1)} active={whatToShow === 1 ? 1 : null}>Мої замовлення</UserNavItem>
              <UserNavItem onClick={() => setShowUserInfo(!showUserInfo)} active={showUserInfo ? 1 : null}>
                <span ><UserIcon /></span>
                <span active={showUserInfo ? 1 : null} onClick={()=>signOut({
                        callbackUrl: `http://localhost:3000/`
                      })}> 
                      <span>{session?.user?.email} <br /> <br /> <p>Вийти з аккаунту</p></span>
                </span>
              </UserNavItem>
              <UserNavItem onClick={()=>setWhatToShow(2)} active={whatToShow === 2 ? 1 : null}>Цифрові товари</UserNavItem>
            </UserNav>
            <>
              { whatToShow === 1 && 
                <OrdersContainer>
                  {userOrders.map(order => (
                  <OrdersRow  key={order._id}>
                    <UserInfoInOrder>
                      <InfoHeader>
                        <div>{order.paid ? <><Ok /> <span>Сплачено</span></> : <><NeOk /> <span>Не сплачено</span> </>}</div>
                        {order.type==='material' 
                          ? <div>{order.delivered ? <><Ok /> <span>Доставлено</span></> : <><NeOk /> <span>Не доставлено</span> </>}</div>
                          : null
                        }
                      </InfoHeader>
                      <InfoMain>
                        <div>{new Date(order.createdAt).toLocaleDateString('en-US', { hour12: false })}</div>
                        <hr />
                        {order.name ? <div>{order.name}</div> : null }
                        {order.middlename ? <div>{order.middlename}</div> : null }
                        {order.surname ? <div>{order.surname}</div> : null }
                        {order.email ? <div>{order.email}</div> : null }
                        {order.type==='material'
                          ? <>
                          {order.phone ? <div>{order.phone}</div> : null }
                          {order.city ? <div>{order.city}</div> : null }
                          {order.warehouse ? <div>{order.warehouse}</div> : null }
                          </>
                          : null
                        }
                      </InfoMain>
                      {order.paid 
                        ? null
                        : <Button onClick={() => deleteOrder(order._id)}>
                            Видалити замовлення
                          </Button>
                      }
                    </UserInfoInOrder>
                    <OrderContainer>
                      <b>{order.type==='material' ? "Фізичні товари" : "Цифрові товари"}</b>
                      {order.line_items.map(item => (
                        <div key={item.price_data.product_data.name}>
                          <span>{item.price_data.product_data.name}</span>
                          <span>{item.quantity} шт</span>
                          <span>{item.price_data.unit_amount} грн</span>
                        </div>
                      ))}
                    </OrderContainer>
                  </OrdersRow>
                  ))}
                </OrdersContainer>
              }
              { whatToShow === 2 && (
                  <StyledProductsGrid>
                    {userCifralProducts.map((product) => (
                      <ProductCifralBox key={product._id} {...product} />
                    ))}
                  </StyledProductsGrid>
                )
              }
            </>
          </UserView>
        </Center>
      </main>
      <Footer />
    </>
  )
}

export default profile

export async function getServerSideProps() {
    await mongooseConnect();
    const products = await Product.find({}, null, {sort:{'_id':-1}});
    return {
      props: {
        products: JSON.parse(JSON.stringify(products)),
      },
    };
  }