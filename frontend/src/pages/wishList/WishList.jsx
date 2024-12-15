import { useSelector } from "react-redux";
import ProductItem from "../../components/products/productItem/ProductItem";
import { Link } from "react-router-dom";

const WishList = () => {
  const wishListProducts = useSelector((state) => state?.wishlist?.wishlist?.data);
  
  return (
    <div className="productList">
      <div className="productList_wrapper">
        {wishListProducts?.map((item) => (
          <ProductItem key={item._id} {...item} />
        ))}
      </div>
      {wishListProducts?.length < 1 && (
        <div>
          There is no product in cart please add product{" "}
          <Link to={"/"}>home</Link>
        </div>
      )}
    </div>
  );
};
export default WishList;
