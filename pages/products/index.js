import { useRouter } from 'next/router';
import {mongooseConnect} from "@/lib/mongoose";
import styled from "styled-components";
import ProductBox from '@/components/ProductBox';
import Header from "@/components/Header";
import Center from "@/components/Center";
import {Product} from "@/models/Product";
import { Category } from "@/models/Categories";
import Footer from "@/components/Footer";
import { radius, width } from '@/lib/vars';
import { featuredBackground, headerBackground, primary } from '@/lib/colors';
import { useContext, useEffect, useState } from 'react';
import { CartContext } from '@/components/CartContext';

// STYLED COMPONENTS
const Bg = styled.div`
  background-color: ${featuredBackground};
`
const FindWrapper = styled.div`
  display: none;
  @media screen and (max-width: 768px) {
    display: flex;
    justify-content: center;
    margin-top: 90px;
  }
`
const Filter = styled.div`
  display: flex;
  gap: 20px;
  justify-content: center;
  flex-wrap: wrap;
  margin: 40px 0 10px;
  & div {
    display: flex;
    align-items: center;
    line-height: 0.95rem;
    & button {
      background: ${featuredBackground};
      border: none;
      font-weight: bold;
      &:hover {
        background: ${primary};
        color: white;
      }
    }
  }
  & select {
    border: none;
    outline: none;
    padding: 5px;
    font-size: 0.9rem;
    background: ${featuredBackground};
    width: 11rem;
    &:focus {
      border: none;
    }
  }
`
const ProductsGrid = styled.div`
  display: grid;
  grid-template-columns:  1fr 1fr 1fr 1fr 1fr;
  gap: 10px;
  justify-items: center;
  margin: 0px auto;
  max-width: ${width};
  padding: 30px;
  @media screen and (max-width: 1140px) {
    grid-template-columns: 1fr 1fr 1fr 1fr;
    justify-items: center;
  }
  @media screen and (max-width: 950px) {
    grid-template-columns: 1fr 1fr 1fr ;
    justify-items: center;
  }
  @media screen and (max-width: 750px) {
    grid-template-columns: 1fr 1fr ;
    justify-items: center;
  }
  @media screen and (max-width: 550px) {
    grid-template-columns: 1fr ;
  }
`;
const Pagination = styled.div`
display: flex;
justify-content: center;
padding: 10px 0;
& ul {
  display: flex;
  gap: 10px;
  list-style: none;
  & li button{
    border-radius: ${radius};
    background-color: ${headerBackground};
    border: none;
    color: white;
    &:hover {
      background: ${primary};
      color: white;
    }
  }
}
`;
const PriceFiletr = styled.div`
  display: flex;
  gap: 5px;
  & span {
    width: max-content;
  }
  & input {
    text-align: center;
    width: 30px;
    border: none;
    height: 100%;
  }
`
// COMPONENT LOGIC

export default function Search(props) {
  
  const {setQuery} = useContext(CartContext);
  const [lowPrice, setlowPrice] = useState('');
  const [maxPrice, setmaxPrice] = useState('');
  const router = useRouter();
  useEffect(()=>{
    const timeout = setTimeout(priceHandler, 300);
    return () => clearTimeout(timeout);
  }, [lowPrice, maxPrice]);

  const {
    query = 'all',
    type = 'all',
    category = 'all',
    price = 'all',
    sort = 'featured',
    page = 1,
    pageSize = 15,
  } = router.query;

  const { products, countProducts, categories, brands, pages } = props;

  const filterSearch = ({
    page,
    type,
    category,
    sort,
    min,
    max,
    searchQuery,
    price,
    rating,
    pageSize
  }) => {
    const { query } = router;
    if (page) query.page = page;
    if (searchQuery) query.searchQuery = searchQuery;
    if (sort) query.sort = sort;
    if (type) query.type = type;
    if (category) query.category = category;
    if (price) query.price = price;
    if (pageSize) query.pageSize = pageSize;
    if (min) query.min ? query.min : query.min === 0 ? 0 : min;
    if (max) query.max ? query.max : query.max === 0 ? 0 : max;

    router.push({
      pathname: router.pathname,
      query: query,
    });
  };
  const categoryHandler = (e) => {
    filterSearch({ category: e.target.value });
  };
  const typeHandler = (e) => {
    filterSearch({ type: e.target.value });
  };
  const pageHandler = (page) => {
    filterSearch({ page });
  };
  const sortHandler = (e) => {
    filterSearch({ sort: e.target.value });
  };
  const priceHandler = () => {
    const low = lowPrice.replace(/[^\d]/g, '');
    const high = maxPrice.replace(/[^\d]/g, '');
    if ( +low > 0 || +high > 0) {
      filterSearch({ price: `${+low || 0}-${+high || 'Infinity'}` });
    }
    else {
      filterSearch({ price: 'all' });
    }
  };
  return (
    <>
      <Header/>
      <main>
        <Center>
          <FindWrapper>
          </FindWrapper>
          <Filter>
            <div>
              <select value={sort} onChange={sortHandler}>
                <option value="newest">Спочатку нові</option>
                <option value="lowest">{'Дешеві > дорогі'}</option>
                <option value="highest">{'Дорогі > дешеві'}</option>
              </select>
            </div>
            <div>
              {/* <h3>Тип</h3> */}
              <select
                value={type}
                onChange={typeHandler}
              >
                <option value="all">Усі типи товару</option>
                <option value="intangible">Електронні дизайни</option>
                <option value="material">Речі з вишивкою</option>
              </select>
            </div>
            <div>
              {/* <h3>Categories</h3> */}
              <select
                value={category}
                onChange={categoryHandler}
              >
                <option value="all">Усі категорії</option>
                {categories &&
                  categories.map((category) => {
                    if(!category.parent) return;
                    else return (<option key={category._id} value={category._id}>
                      {category.name}
                    </option>)
                  })}
              </select>
            </div>
            
            <PriceFiletr>
              <span>Ціна </span>
              <input type="text" id='lowPrice' value={lowPrice } placeholder='min' onChange={(e)=>setlowPrice(e.target.value)}/>
              <span>-</span>
              <input type="text" id='maxPrice' value={maxPrice} placeholder='max' onChange={(e)=>setmaxPrice(e.target.value)}/>
            </PriceFiletr>
            <div>
              {/* <h3>Фільтри</h3> */}
              {products.length === 0 ? 'Немає' : countProducts} товарів
              {query !== 'all' && query !== '' && ' > ' + query}
              {category !== 'all' && ' > ' + (categories.find(c => category === c._id)).name}
              {price !== 'all' && ' > Фільтр ціни '}
              &nbsp;
              {(query !== 'all' && query !== '') ||
              category !== 'all' ||
              price !== 'all' ? (
                <button onClick={async() => {
                  await router.push('/products');
                  setlowPrice(''); setmaxPrice(''); setQuery('');
                  }}>
                  Х
                </button>
              ) : null}
            </div>
          </Filter>
        </Center>
        <Bg>
          <ProductsGrid>
            {products.map((product) => (
              <ProductBox key={product._id} {...product} />
            ))}
          </ProductsGrid>
        </Bg>
        <Pagination>
          <ul>
            {products.length > 0 &&
              [...Array(pages).keys()].map((pageNumber) => (
                <li key={pageNumber}>
                  <button
                    className={`default-button m-2 ${
                      page == pageNumber + 1 ? 'font-bold' : ''
                    } `}
                    onClick={() => pageHandler(pageNumber + 1)}
                  >
                    {pageNumber + 1}
                  </button>
                </li>
              ))}
          </ul>
        </Pagination>
      </main>
      <Footer />
    </>
  );
}

export async function getServerSideProps({ query }) {
  const pageSize = query.pageSize || 15;
  const page = query.page || 1;
  const type = query.type || '';
  const category = query.category || '';
  const price = query.price || '';
  const sort = query.sort || '';
  const searchQuery = query.query || '';

  const queryFilter =
    searchQuery && searchQuery !== 'all'
      ? {
          title: {
            $regex: searchQuery,
            $options: 'i',
          },
        }
      : {};
  const typeFilter = type && type !== 'all' ? { type } : {};
  const categoryFilter = category && category !== 'all' ? { category } : {};
  const priceFilter =
    price && price !== 'all'
      ? {
          price: {
            $gte: Number(price.split('-')[0]),
            $lte: Number(price.split('-')[1]),
          },
        }
      : {};
  const order =
    sort === 'featured'
      ? { isFeatured: -1 }
      : sort === 'lowest'
      ? { price: 1 }
      : sort === 'highest'
      ? { price: -1 }
      : sort === 'newest'
      ? { createdAt: -1 }
      : { _id: -1 };

  await mongooseConnect();
  const categoriesDocs = await Category.find({})
  const productDocs = await Product.find(
    {
      ...queryFilter,
      ...typeFilter,
      ...categoryFilter,
      ...priceFilter,
    },
    '-reviews'
  )
    .sort(order)
    .skip(pageSize * (page - 1))
    .limit(pageSize)
    .lean();

  const countProducts = await Product.countDocuments({
    ...queryFilter,
    ...typeFilter,
    ...categoryFilter,
    ...priceFilter,
  });

  const products = JSON.parse(JSON.stringify(productDocs))
  const categories = JSON.parse(JSON.stringify(categoriesDocs))
  return {
    props: {
      products,
      countProducts,
      page,
      pages: Math.ceil(countProducts / pageSize),
      categories,
    },
  };
}
