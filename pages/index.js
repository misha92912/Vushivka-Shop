import Header from "@/components/Header";
import Featured from "@/components/Featured";
import {Product} from "@/models/Product";
import {mongooseConnect} from "@/lib/mongoose";
import NewProducts from "@/components/NewProducts";
import Suggest from "@/components/Suggest";
import Footer from "@/components/Footer";
import Categories from "@/components/Categories";
import { Category } from "@/models/Categories";

export default function HomePage({featuredProduct, newProducts, categories}) {
  
  return (
    <>
      <Header />
      <main>
        <Featured product={featuredProduct} />
        <Suggest />
        <NewProducts products={newProducts} />
        <Categories  categories={categories}  />
      </main>
      <Footer />
    </>
  );
}

export async function getServerSideProps() {
  const featuredProductId = '64b7a67dec1b51e1a290d491';
  await mongooseConnect();
  const featuredProduct = await Product.findById(featuredProductId);
  const newProducts = await Product.find({}, null, {sort: {'_id':-1}, limit:5});
  const categories = await Category.find({});
  return {
    props: {
      featuredProduct: JSON.parse(JSON.stringify(featuredProduct)),
      newProducts: JSON.parse(JSON.stringify(newProducts)),
      categories: JSON.parse(JSON.stringify(categories)),
    },
  };
}
