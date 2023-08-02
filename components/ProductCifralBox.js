import styled from "styled-components";
import Link from "next/link";
import { radius } from "@/lib/vars";
import { headerActionText, headerBackground } from "@/lib/colors";

const ProductWrapper = styled.div`
  display: flex;
  width: 200px;
  flex-direction: column;
  justify-content: space-between;
  padding: 5px;
  border-radius: ${radius};
  overflow: hidden;
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
  transition: 300ms;
  &:hover {
    transform: scale(1.02);
  }
`;

const WhiteBox = styled(Link)`
  max-height: 100px;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: ${radius};
  overflow:hidden;
  div {
    min-height: 100px;
  }
  img{
    max-width: 100%;
  }
`;

const Title = styled.div`
  display: block;
  font-weight: normal;
  font-size: 1.1rem;
  color:inherit;
  text-decoration:none;
  margin: 10px 0;
  text-align: center;
  min-width: 100%;
`;
const Download = styled.a`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px;
  background-color: ${headerBackground};
  border-radius: ${radius};
  text-decoration: none;
  color: white;
  &:active {
    color: ${headerActionText};
  }
`
const Nodownload = styled.a`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px;
  background-color: grey;
  border-radius: ${radius};
  text-decoration: none;
  color: white;
  cursor: not-allowed;
`
const ProductInfoBox = styled.div`
  margin-top: 5px;
`;

const ProductCifralBox = ({_id, title, images, link}) => {
  const url = '/product/'+_id;
  let downloadLink = '';
  if (typeof(link) !== 'undefined' && link.length > 0) {
      const regex_ids = /file\/d\/[^\/]{0,}/gm;
      const res = regex_ids.exec(link);
      if (res){
        const id = res[0]?.split("/")[2] || '';
        downloadLink = `https://drive.google.com/uc?export=download&confirm=no_antivirus&id=${id}`;
      }
    }
    return (
    <ProductWrapper>
      <WhiteBox href={url}>
        <div>
          <img src={images?.[0]} alt=""/>
        </div>
      </WhiteBox>
      <ProductInfoBox>
        <Title>{title}</Title>
        {downloadLink
          ? <Download href={downloadLink}>
                Завантажити
            </Download>
          : <Nodownload disabled={true}>Немае посилання</Nodownload>
        }
      </ProductInfoBox>
    </ProductWrapper>
  )
}

export default ProductCifralBox