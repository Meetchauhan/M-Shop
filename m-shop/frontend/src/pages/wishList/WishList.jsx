import { useSelector } from "react-redux";
import ProductItem from "../../components/products/productItem/ProductItem";
import { Link } from "react-router-dom";
import PageTransition from "../../components/pageTransition/PageTransition";
import Heading from "../../components/heading/Heading";

const WishList = () => {
  const wishListProducts = useSelector(
    (state) => state?.wishlist?.wishlist?.data
  );
  console.log("wishlist product", wishListProducts);

  return (
    <div className="productList">
      <div className="container">
      <Heading title={"Wishlist"} />
        {wishListProducts?.length > 1 && (
          <div className="wishlist_wrap">
            <div className="title">Your Wishlist</div>
            <div className="continue_shopping">
              <PageTransition to="/">Continue Shopping</PageTransition>
            </div>
          </div>
        )}
      </div>
      <div className="productList_wrapper">
        {wishListProducts?.map((item) => (
          <ProductItem key={item._id} {...item} />
        ))}
      </div>
      {(wishListProducts?.length < 1 || wishListProducts === undefined) && (
        <div>
          There is no product in Wishlist, to add product in Wishlist then click{" "}
          {""}
          <Link to={"/"}>here</Link>
        </div>
      )}
    </div>
  );
};
export default WishList;
