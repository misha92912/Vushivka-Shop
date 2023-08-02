import styled from 'styled-components';
import CategoryBox from "@/components/CategoryBox";
import Center from '@/components/Center';
import ChapterTitle from './ChapterTitle';

const CategoryGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 5px;
  @media screen and (max-width: 950px) {
    display: flex;
    flex-wrap: wrap;
  }
  align-items: center;
  justify-content: center;
`; 

const Title = styled.h2`
  font-size: 2rem;
  width: 100%;
  margin: 30px 0 20px;
  font-weight: normal;
  text-align: center;
`

const Categories = ({categories}) => {
  const showCategories = categories
  return ( 
    <Center>
      <ChapterTitle active={null}>Категорії</ChapterTitle> 
      <CategoryGrid>
        {showCategories?.length > 0 && showCategories.map(category => (
          <CategoryBox {...category} key={category?._id}/>
        ))}
      </CategoryGrid>
        
    </Center>
  )
}

export default Categories