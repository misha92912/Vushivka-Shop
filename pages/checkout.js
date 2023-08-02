import Button from '@/components/Button';
import { CartContext } from '@/components/CartContext';
import Center from '@/components/Center'
import Footer from '@/components/Footer';
import Header from '@/components/Header'
import Input from "@/components/Input";
import Table from '@/components/Table';
import { headerBackground, primary } from '@/lib/colors';
import { radius } from '@/lib/vars';
import axios from 'axios';
import { useSession } from 'next-auth/react';
import React, { useContext, useEffect, useState } from 'react'
import styled, { css } from 'styled-components';

const ColumnsWrapper = styled.div`
  display: grid;
  gap: 40px;
  margin-top: 40px;
  grid-template-columns: 1.2fr .8fr;
  @media screen and (max-width: 768px) {
    grid-template-columns: 1fr;
    margin-top: 100px;
  }
`;
const Label = styled.div`
  display: flex;
  font-size: 1.2rem;
  margin-top: 10px;
`
const Box = styled.div`
  background-color: #fff;
  border-radius: ${radius};
  padding: 30px;
  overflow: hidden;
  transition: 100ms;
  ${props => props.hidden && css`
  display: none;
  `}
  & * {
    transition: 200ms;
  }
  & ul {
    padding: 0;
    margin: 0;
    list-style: none;
    & li {
      padding: 0;
      margin: 10px 0;
    }
  }
  & input[type='radio'] {
    display: none;
  }
  & input:checked + label {
    & span {
      font-weight: bold;
    }
    & span:before {
      min-width: 5px;
      min-height: 5px;
      border-radius: 50%;
      border: 6px solid ${primary};
    }
  }
`;
const BoxTitle = styled.div`
display: flex;
width: 100%;
justify-content: space-between;
`
const Row = styled.form`
  display: flex;
  flex-direction: column;
`;

const CheckoutBox = styled.div`
  display: block;
  height: max-content;
  background-color: #fff;
  border-radius: ${radius};
  padding: 30px;
`;
const Result = styled.tr`
  & td {
    padding-top: 20px
  }
  & td:nth-child(2){
    text-align: center;
  }
`;
const Count = styled.div`
  display: flex;
  justify-content:center;
  align-items: center;
  margin-bottom: 20px;
`

const Price = styled.div`
  display: flex;
  justify-content:center;
`
const ProductInfoCell = styled.td`
  padding: 10px 0;
`;

const ProductImageBox = styled.div`
  width: 70px;
  height: 100px;
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
  @media screen and (min-width: 768px) {
    padding: 10px;
    width: 100px;
    height: 100px;
    img{
      max-width: 100%;
      max-height: 100%;
    }
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

const DeliveryWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr 1fr;
  gap: 10px;
`

const DeliverySelect = styled.select`
  width: 100%;
  height: 2rem;
  padding: 5px;
  margin-bottom: 5px;
  border: 1px solid #ccc;
  border-radius: ${radius};
  box-sizing:border-box;
`
const Warning = styled.div`
  color:darkred;
  font-size: 0.8rem;
`
const SubmitButton = styled.div`
  padding: 10px;
  width: 100%;
  background: ${headerBackground};
  color: white;
  text-align: center;
  cursor: pointer;
  &:hover{
    background: black;
  } 
`
const Chekout = () => {
  const {cartProducts,addProduct,removeProduct,clearCart} = useContext(CartContext);
  const [products,setProducts] = useState([]);
  const [name,setName] = useState('');
  const [surname,setSurname] = useState('');
  const [middlename,setMiddlename] = useState('');
  const [phone,setPhone] = useState('');
  const [email,setEmail] = useState('');
  const [city,setCity] = useState('');
  const [warehouse, setWarehouse] = useState('');
  const [delivery, setDelivery] = useState('');
  const [payment, setPayment] = useState('');
  
  const [nameError,setNameError] = useState('');
  const [surnameError,setSurnameError] = useState('');
  const [phoneError,setPhoneError] = useState('');
  const [emailError,setEmailError] = useState('');
  const [cityError,setCityError] = useState('');
  const [warehouseError, setWarehouseError] = useState('');
  const [deliveryError, setDeliveryError] = useState('');
  const [paymentError, setPaymentError] = useState('');
  const { data: session } = useSession();

  useEffect(()=>{
    if(!!session) {
      setEmail(session?.user?.email)
      setName(session?.user?.name.split(' ')[0])
      setSurname(session?.user?.name.split(' ')[1])
    }
  }, [])
 
  let materialTotal = 0;
  
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

  const materialProducts = products.filter(p => p.type === 'material');

  for (const productId of cartProducts) {
    const materialPrice = materialProducts.find(p => p._id === productId)?.price || 0;
    materialTotal += materialPrice;
  }

  function formValidation(ev) {
    if (!ev) {
      !name ? setNameError('Потрібно більше 2-х сімволів і менше 15-ти') : setNameError('');
      !surname ? setSurnameError('Потрібно більше 2-х сімволів і менше 15-ти') : setSurnameError('');
      !phone ? setPhoneError('Потрібно формату +380хх хххх ххх або 0хх хххх ххх') : setPhoneError('');
      !email ? setEmailError('Потрібно формату test@mailbox.com') : setEmailError('');
      !city ? setCityError('Вкажіть адресу') : setCityError('');
      !warehouse ? setWarehouseError('Вкажіть № відділення') : setWarehouseError('');
      !delivery ? setDeliveryError('Oберіть доставку') : setDeliveryError('');
      !payment ? setPaymentError('Оберіть тип оплати') :setPaymentError('');

      if ( name && surname && phone && email && city && warehouse && delivery && payment &&
        !nameError && !surnameError && !phoneError && !emailError && 
        !cityError && !warehouseError && !deliveryError && !paymentError ) 
        {
          return true;
        }
      else {
        return false;
      };
    }
    const target = ev.target;
    switch (target.name) {
      case 'name':
        target.value.length < 3 || target.value.length > 15
          ? setNameError('Потрібно більше 2-х сімволів і менше 15-ти')
          : setNameError('');
        setName(target.value)
        break;
      case 'surname':
        target.value.length < 3 || target.value.length > 15
          ? setSurnameError('Потрібно більше 2-х сімволів і менше 15-ти')
          : setSurnameError('');
        setSurname(target.value)
        break;
      case 'phone':
        const phoneRegexp = /^\+?3?8?(0\d{9})$/;
        !phoneRegexp.test(target.value.replace(/[ ()-]/gm, ''))
          ? setPhoneError('Потрібно формату +380хх хххх ххх або 0хх хххх ххх')
          : setPhoneError('');
        setPhone(target.value)
        break;
      case 'email':
        const mailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
        !mailRegex.test(target.value)
          ? setEmailError('Потрібно формату test@mailbox.com')
          : setEmailError('');
        setEmail(target.value)
        break;
      case 'city':
        !target.value
          ? setCityError('Вкажіть адресу')
          : setCityError('');
        setCity(target.value)
        break;
      case 'warehouse':
        !target.value
          ? setWarehouseError('Вкажіть № відділення')
          : setWarehouseError('');
        setWarehouse(target.value)
        break;
      case 'delivery':
        !target.value
          ? setDeliveryError('Oберіть доставку')
          : setDeliveryError('');
        setDelivery(target.value);
        break;
      case 'prepayment':
        !target.value
          ? setPaymentError('Оберіть тип оплати')
          : setPaymentError('');
        setPayment(target.value);
      default:
        break;
    }
  }
  async function goToPayment(e) {
    e.preventDefault();
    if (!formValidation()) return;
    const materialIds = materialProducts.map(p => p._id);
    const materialProductsIds = cartProducts.filter(id => materialIds.includes(id))
    const response = await axios.post('/api/checkout', {
            name,surname,middlename,email,phone,city,warehouse,
            delivery, payment, materialProductsIds
    });
    clearCart(materialProductsIds);
    if (response.data.url) {
      window.location = response.data.url;
    }
  }

  function moreOfThisProduct(id) {
    addProduct(id);
  }
  function lessOfThisProduct(id) {
    removeProduct(id);
  }
  
  return (
    <>
      <Header />
        <main>
          <Center>
          <ColumnsWrapper>
            <Row>
              <Box>
                <h2>Контактна інформация</h2>
                  <Label>Ім'я</Label>
                  <Input type="text"
                          required
                          placeholder="Ім'я"
                          value={name}
                          name="name"
                          onChange={ev => formValidation(ev)} />
                  {nameError ? (<Warning>{nameError}</Warning>) : null}
                  <Label>Прізвище</Label>
                  <Input type="text"
                          required
                          placeholder="Прізвище"
                          value={surname}
                          name="surname"
                          onChange={ev => formValidation(ev)} />
                  {surnameError ? (<Warning>{surnameError}</Warning>) : null}
                  <Label>По батькові</Label>
                  <Input type="text"
                          placeholder="Прізвище"
                          value={middlename}
                          name="middlename"
                          onChange={ev => setMiddlename(ev.target.value)} />
                  <Label>Електронна пошта</Label>
                  <Input type="email"
                          required
                          placeholder="Електронна пошта"
                          value={email}
                          name="email"
                          onChange={ev => formValidation(ev)}/>
                  {emailError ? (<Warning>{emailError}</Warning>) : null}
                  <Label>Номер телефону</Label>
                  <Input type="text"
                          required
                          placeholder="Номер телефону"
                          value={phone}
                          name="phone"
                          onChange={ev => formValidation(ev)}/>
                  {phoneError ? (<Warning>{phoneError}</Warning>) : null}
              </Box>
              <Box>
                <BoxTitle>
                  <h2>Доставка</h2>
                </BoxTitle>
                <DeliveryWrapper>
                  <div>
                    <DeliverySelect value={delivery} name="delivery" id="delivery" onChange={ev => formValidation(ev)}>
                      <option value=""></option>
                      <option value="novaposhta">Нова Пошта</option>
                      <option value="ukrposhta">Укрпошта</option>
                    </DeliverySelect>
                    {deliveryError ? (<Warning>{deliveryError}</Warning>) : null}
                  </div>
                  <div>
                    <DeliverySelect value={payment} name="prepayment" id="prepayment" onChange={ev => formValidation(ev)}>
                      <option value=""></option>
                      <option value="yes">По передплаті</option>
                      <option value="no">Платити при отриманні</option>
                    </DeliverySelect>
                    {paymentError ? (<Warning>{paymentError}</Warning>) : null}
                  </div>
                  
                </DeliveryWrapper>
                <div>
                  <Label>Місто</Label>
                  <Input type="text"
                          placeholder="Місто"
                          value={city}
                          name="city"
                          onChange={ev => formValidation(ev)}/>
                {cityError ? (<Warning>{cityError}</Warning>) : null}
                </div>
                <div>
                  <Label>Відділення</Label>
                  <Input type="text"
                          placeholder="Відділення"
                          value={warehouse}
                          name="warehouse"
                          onChange={ev => formValidation(ev)}/>
                {warehouseError ? (<Warning>{warehouseError}</Warning>) : null}
                </div>
                
              </Box>
              
              <Box>
                <BoxTitle>
                  <SubmitButton onClick={goToPayment}
                              >
                        Замовити
                  </SubmitButton>
                </BoxTitle>
              </Box>
            </Row>
            <CheckoutBox>
              <h2>Ваше замовлення</h2>
              <Table>
                <thead></thead>
                <tbody>
                  {materialProducts.map(product => (
                    <tr key={product._id}>
                      <ProductInfoCell>
                        <ProductImageBox>
                          <img src={product.images[0]} alt=""/>
                        </ProductImageBox>
                        {product.title}
                      </ProductInfoCell>
                      <td>
                        <Count>
                          <Button
                            onClick={() => lessOfThisProduct(product._id)}>-</Button>
                          <QuantityLabel>
                            {cartProducts.filter(id => id === product._id).length}
                          </QuantityLabel>
                          <Button
                            onClick={() => moreOfThisProduct(product._id)}>+</Button>
                        </Count>
                        <Price>{cartProducts.filter(id => id === product._id).length * product.price} грн</Price>
                      </td>
                      <td>
                      </td>
                    </tr>
                  ))}
                    <Result><td>СУММА: </td><td>{materialTotal} грн</td></Result>
                </tbody>
              </Table>
            </CheckoutBox>
          </ColumnsWrapper>
          </Center>
        </main>
      <Footer />
    </>
  )
}

export default Chekout