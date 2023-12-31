import Footer from '@/components/Footer'
import Header from '@/components/Header'
import { radius } from '@/lib/vars';
import React, { useState } from 'react'
import styled from 'styled-components';

const TextContainer = styled.div`
  h2 {
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

const aboutUs = () => {
  return (
    <>
      <Header />
      <main>
        <TextContainer>
          <h2>Про нас</h2>
          <p>Ласкаво просимо до нашого сайту. У нас ви можете придбати речі з вишивкою або електронний дизайн для самостійного виконання вишивки на вашій машині. Наш сайт засновано у 2023 році, і ми раді допомогти вам у створенні вашого унікального стилю або запропонувати оригінальні подарунки.</p>
          До вашої уваги:
          <ul>
            <img src="/style.jpg" alt="" className='first-img'/>
            <li><p>1. Якісні електронні дизайни. Наша команда талановитих дизайнерів працює над створенням високоякісних електронних дизайнів вишивок. Легкість використання. Всі наші електронні дизайни доступні у популярних форматах машинної вишивки. Ви з легкістю зможете самі створити одяг з оригінальним дизайном або прикрасити аксесуари і зробити оригінальний подарунок. Ми працюємо аби ви могли без перепон почати творити.</p></li>
            <img src="/processe.jpg" alt="" className='second-img' />
            
            <li><p>
              2. Широкий вибір готових продуктів. Крім електронних дизайнів, ми також пропонуємо широкий вибір речей з вишивками. Ви можете знайти наші унікальні дизайни на футболках, світшотах, сумках та інших предметах, аби виразити свою індивідуальність та стиль.</p>
           </li>
            <li><p>3. Підтримка та оновлення. Ми пишаємося наданням відмінного обслуговування клієнтів. Якщо у вас виникнуть питання чи проблеми з нашими продуктами, наша команда підтримки завжди готова допомогти вам. Ми також регулярно оновлюємо наші колекції дизайнів, аби запропонувати вам нові та цікаві варіанти.</p></li>
          </ul>
          <p>Ми сподіваємося, що наші електронні дизайни та речі з вишивками дозволять вам втілити ваші творчі ідеї у реальність. Розділ сайту з продажу електронних дизайнів вишивок та речей із вишивками є вашим ключем до унікального стилю та оригінальності.</p>
        </TextContainer>
      </main>
      <Footer />
    </>
  )
}

export default aboutUs