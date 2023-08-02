import styled from "styled-components";
import Link from "next/link";
import { radius } from "@/lib/vars";
import { headerActionText } from "@/lib/colors";

const CategoryWrapper = styled.div`
  display: flex;
  width: 170px;
  flex-direction: column;
  padding: 5px;
  border-radius: ${radius};
  overflow: hidden;
  transition: 100ms;
  &:hover {
    transform: scale(1.01);
    filter: brightness(1.06);
    & h2 {
      color: ${headerActionText};
    }
  }
`;

const Title = styled.h2`
  display: block;
  font-weight: normal;
  font-size: 1.3rem;
  color:inherit;
  text-decoration:none;
  margin: 5px 0 15px 0;
  text-align: center;
  min-width: 100%;
`;

const CategoryInfoBox = styled(Link)`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 5px;
  color:inherit;
  text-decoration:none;
  max-width: 170px;
  height: 200px;
  overflow: hidden;
  img {
    width: 100%;
    border-radius: ${radius};
  }
`;

const CategoryRow = styled.div`
  display: block;
  @media screen and (min-width: 768px) {
    display: flex;
    gap: 5px;
  }
  align-items: center;
  justify-content:center;
  margin: 20px 5px 0;
`;



const CategoryBox = ({_id, name, images, parent}) => {
    if ( !parent ) return null;
    const url = '/products?category=' + _id;
    return (
    <CategoryWrapper>
      <CategoryInfoBox target="_blank"  href={url}>
        <Title target="_blank"  href={url}>{name}</Title>
        <img src={images[0]} alt="" />
        <CategoryRow>
        </CategoryRow>
      </CategoryInfoBox>
    </CategoryWrapper>
  )
}

export default CategoryBox