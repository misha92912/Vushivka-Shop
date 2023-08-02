import Footer from '@/components/Footer'
import Header from '@/components/Header'
import { radius } from '@/lib/vars';
import React, { useState } from 'react'
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

const aboutDellivery = () => {
  return (
    <>
      <Header />
      <main>
        <TextContainer>
        <h2>Повернення та заміна</h2>

          <p>Ми цінуємо вашу довіру та прагнемо забезпечити максимальну задоволеність від покупки нашої продукції. У випадку, якщо вам потрібно повернути або замінити товар, ми пропонуємо просту та зручну процедуру повернення та заміни.</p>

          <h4>Політика повернення:</h4>
              <ul>
                  <li>- Ви маєте право повернути товар протягом певного періоду після отримання замовлення. Подробиці про термін повернення можна знайти на нашому сайті або у вашому замовленні.</li>
                  <li>- Товар повинен бути в оригінальній упаковці та стані, без ознак використання чи пошкоджень.</li>
                  <li>- Для оформлення повернення вам необхідно зв'язатися з нашою службою підтримки клієнтів та надати інформацію про замовлення та причини повернення.</li>
                  <li>- Після отримання поверненого товару ми проведемо його перевірку та виконаємо повернення коштів відповідно до нашої політики повернення.</li>
              </ul>

          <h4>Процедура заміни:</h4>
              <ul>
                  <li>- Якщо вам потрібно замінити товар, зверніться до нашої служби підтримки клієнтів для організації заміни.</li>
                  <li>- Заміна буде здійснена у разі наявності аналогічного товару у нашому асортименті.</li>
                  <li>- Будь ласка, повідомте нам інформацію про замовлення та причину заміни, щоб ми могли забезпечити швидке та точне обслуговування.</li>
              
              </ul>

        </TextContainer>
      </main>
      <Footer />
    </>
  )
}

export default aboutDellivery