import { useEffect } from "react";
import ProductList from "../../components/products/productList/ProductList";

const Home = () => {
  useEffect(() => {
    document.title = "Shop";
  }, []);
  
  return (
    <div>
      <ProductList />
    </div>
  );
};

export default Home;
