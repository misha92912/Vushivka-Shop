import styled from 'styled-components';
import Center from '@/components/Center';
import ChapterTitle from './ChapterTitle';
import Link from 'next/link';
import { headerActionText, headerBackground, headerText } from '@/lib/colors';
import { radius } from '@/lib/vars';

const Wrapper = styled.div`
  display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
  gap: 10px;
  @media screen and (max-width: 900px) {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
  }
  @media screen and (max-width: 730px) {
    display: grid;
    grid-template-columns: 1fr;
  }
`; 

const BigLink = styled(Link)`
  display: flex;
  flex-direction: column;
  justify-self: center;
  justify-content: space-between;
  align-items: center;
  max-width: 400px;
  height: 500px;
  color:${headerText};
  font-size: 1.2rem;
  text-decoration:none;
  padding: 10px;
  margin: 5px;
  background-color: ${headerBackground};
  border-radius: ${radius};
  transition: 200ms;
  
  &:hover{
    transition: 200ms;
    color:${headerActionText};
    filter: brightness(1.1);
  }
  & img{
    max-width: 100%;
    max-height: 410px;
  }
  & h3{
    text-align: center;
    text-transform: uppercase;
  }
`;
const Suggest = () => {
  return ( 
    <Center>
      <ChapterTitle active={null}>Ми пропонуємо</ChapterTitle> 
      <Wrapper>
          <BigLink target="_blank" href={'/products?type=intangible'}>
            <img src="/Cat.png" alt="" />
            <h3>Електронні <br /> дизайни</h3>
          </BigLink>
          <BigLink target="_blank" href={'/products?type=material'}>
            <img src="/T_short.png" alt="" />
            <h3>Речі <br /> з вишивками</h3>
          </BigLink>
      </Wrapper>
            
    </Center>
  )
}

export default Suggest