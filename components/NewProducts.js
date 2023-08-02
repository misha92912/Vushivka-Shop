import styled from 'styled-components';
import ProductBox from "@/components/ProductBox";
import Center from '@/components/Center';
import { featuredBackground } from '@/lib/colors';
import { blockGap } from '@/lib/vars';

const Bg = styled.div`
  background-color: ${featuredBackground};
  padding: 10px 0 30px;
  margin: 0 -20px;
  margin-top: ${blockGap};
`;

const ProductsGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 10px;
`; 

const Title = styled.h2`
  max-width: 100%;
  font-size: 2rem;
  font-weight: normal;
  text-align: center;
  padding: 0px 10px 5px;
  font-weight: normal;
`

const NewProducts = ({products}) => {
  return ( 
    <Bg>
      <Center>
        <Title active={null}>Нові надходження</Title> 
        <ProductsGrid>
          {products?.length > 0 && products.map(product => (
            <ProductBox {...product} key={product._id}/>
          ))}
        </ProductsGrid>
      </Center>
    </Bg>
  )
}

export default NewProducts