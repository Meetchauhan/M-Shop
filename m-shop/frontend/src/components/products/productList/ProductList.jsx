import { useDispatch, useSelector } from "react-redux";
import ProductItem from "../productItem/ProductItem";
import { useEffect } from "react";
import { allProducts } from "../../../features/productSlice";
import "./productList.scss";
import Heading from "../../heading/Heading";
import SelectFilter from "../../selectFilter/SelectFilter";
// import CardLoader from "../../loaders/cardLoader/CardLoader";

const ProductList = () => {
  const getAllProducts = useSelector(
    (state) => state?.products?.products?.data
  );
  const category = useSelector((cat) => cat?.categoryFilter?.value?.category);
  console.log("get category", category);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(allProducts());
  }, [dispatch]);
  return (
    <div className="productList">
      <div className="container">
        <Heading title={"Product List"} />
        <SelectFilter />
        <div className="productList_wrapper">
          {getAllProducts
            ?.filter((item) => category === "" || category === "All" || item.category === category)
            .map((item) => (
              <ProductItem
                key={item._id}
                productId={item._id}
                name={item.name}
                price={item.price}
                image={item.image}
                quantity={item.quantity}
                totalQuantity={item.quantity}
              />
            ))}
        </div>
      </div>
    </div>
  );
};
export default ProductList;
