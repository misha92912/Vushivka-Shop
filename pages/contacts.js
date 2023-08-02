import Footer from '@/components/Footer'
import Header from '@/components/Header'
import { radius } from '@/lib/vars';
import React from 'react'
import styled from 'styled-components';

const TextContainer = styled.div`
  h2 {
    text-align: center;
  }
  h4 {
    text-align: center;
  }
  img {
    margin: 0 10px;
  }
  img.first-img {
    float: right;
    width: 300px;
    border-radius: ${radius};
  }
  img.second-img {
    float: left;
    width: 300px;
    border-radius: ${radius};
  }
  ul {
    list-style: none;
    padding: 0;
    li{
      margin: 15px 0;
    }
  }
  @media screen and (max-width: 781px) {
    margin-top: 120px;
    img {
      margin: 10px;
    }
    img.first-img {
    float: right;
    max-width: 100%;
    border-radius: ${radius};
    }
    img.second-img {
      float: left;
      max-width: 100%;
      border-radius: ${radius};
    }
  }
`;
const contacts = () => {
  return (
    <>
      <Header />
      <main>
        <TextContainer>
        <h2>Повернення та заміна</h2>
        
        <p>
          <svg height="15" viewBox="0 0 1792 1792" width="15" xmlns="http://www.w3.org/2000/svg">
            <path d="M1472 992v480q0 26-19 45t-45 19h-384v-384h-256v384h-384q-26 0-45-19t-19-45v-480q0-1 .5-3t.5-3l575-474 575 474q1 2 1 6zm223-69l-62 74q-8 9-21 11h-3q-13 0-21-7l-692-577-692 577q-12 8-24 7-13-2-21-11l-62-74q-8-10-7-23.5t11-21.5l719-599q32-26 76-26t76 26l244 204v-195q0-14 9-23t23-9h192q14 0 23 9t9 23v408l219 182q10 8 11 21.5t-7 23.5z"/>
          </svg> Офіс: Кальпінка, вул. Мурзальська 175
        </p>
        <p>
          <svg height="15" viewBox="0 0 1792 1792" width="15" xmlns="http://www.w3.org/2000/svg">
            <path d="M1472 992v480q0 26-19 45t-45 19h-384v-384h-256v384h-384q-26 0-45-19t-19-45v-480q0-1 .5-3t.5-3l575-474 575 474q1 2 1 6zm223-69l-62 74q-8 9-21 11h-3q-13 0-21-7l-692-577-692 577q-12 8-24 7-13-2-21-11l-62-74q-8-10-7-23.5t11-21.5l719-599q32-26 76-26t76 26l244 204v-195q0-14 9-23t23-9h192q14 0 23 9t9 23v408l219 182q10 8 11 21.5t-7 23.5z"/>
          </svg> Пн. – Пт.: 9:00 – 18:00 Сб. - Нд.: Вихідний
        </p>
        <p>
          <svg height="15" viewBox="0 0 1792 1792" width="15" xmlns="http://www.w3.org/2000/svg"><path d="M1600 1240q0 27-10 70.5t-21 68.5q-21 50-122 106-94 51-186 51-27 0-52.5-3.5t-57.5-12.5-47.5-14.5-55.5-20.5-49-18q-98-35-175-83-128-79-264.5-215.5t-215.5-264.5q-48-77-83-175-3-9-18-49t-20.5-55.5-14.5-47.5-12.5-57.5-3.5-52.5q0-92 51-186 56-101 106-122 25-11 68.5-21t70.5-10q14 0 21 3 18 6 53 76 11 19 30 54t35 63.5 31 53.5q3 4 17.5 25t21.5 35.5 7 28.5q0 20-28.5 50t-62 55-62 53-28.5 46q0 9 5 22.5t8.5 20.5 14 24 11.5 19q76 137 174 235t235 174q2 1 19 11.5t24 14 20.5 8.5 22.5 5q18 0 46-28.5t53-62 55-62 50-28.5q14 0 28.5 7t35.5 21.5 25 17.5q25 15 53.5 31t63.5 35 54 30q70 35 76 53 3 7 3 21z"/>
          </svg> +38(000)-123-4567
        </p>
          
        </TextContainer>
      </main>
      <Footer />
    </>
  )
}

export default contacts