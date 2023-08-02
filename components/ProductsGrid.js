import styled from "styled-components";
import ProductBox from "@/components/ProductBox";

const StyledProductsGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  margin-top: 80px;
  gap: 30px;
  @media screen and (min-width: 768px) {
    margin-top: 0px;
    grid-template-columns: 1fr 1fr 1fr 1fr ;
  }
`;

export default function ProductsGrid({ products }) {

  return (
    <>
      <StyledProductsGrid>
        {products?.length > 0 && products.map(product => (
          <ProductBox key={product._id} {...product} />
        ))}
      </StyledProductsGrid>
    </>
  );
}