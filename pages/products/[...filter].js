import Header from "@/components/Header";
import Center from "@/components/Center";
import {mongooseConnect} from "@/lib/mongoose";
import {Product} from "@/models/Product";
import { Category } from "@/models/Categories";
import ProductsGrid from "@/components/ProductsGrid";
import Title from "@/components/ChapterTitle";
import Footer from "@/components/Footer";

export default function ProductsPage({products, categories, filter}) {
  return (
    <>
      <Header />
      <main>
        <Center>
          <Title>Наші товари</Title>
          <ProductsGrid products={products} categories={categories} filter={filter}/>
        </Center>
      </main>
      <Footer />
    </>
  );
}

export async function getServerSideProps(context) {
  await mongooseConnect();
  const {filter} = context.query;
  const products = await Product.find({}, null, {sort:{'_id':-1}});
  const categories = await Category.find({});
  return {
    props:{
      products: JSON.parse(JSON.stringify(products)),
      categories: JSON.parse(JSON.stringify(categories)),
      filter: filter
    }
  };
}