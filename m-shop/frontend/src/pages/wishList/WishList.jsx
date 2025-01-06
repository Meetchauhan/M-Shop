import { useSelector } from "react-redux";
import ProductItem from "../../components/products/productItem/ProductItem";
import { Link } from "react-router-dom";
import PageTransition from "../../components/pageTransition/PageTransition";
import emptyWishlist from "../../images/empty_wishlist.jpg";
import "./wishlist.scss"

const WishList = () => {
  const wishListProducts = useSelector(
    (state) => state?.wishlist?.wishlist?.data
  );
  console.log("wishlist product", wishListProducts);

  return (
    <div className="productList">
      <div className="container">
        {wishListProducts?.length > 1 && (
          <div className="wishlist_wrap">
            <div className="title">Your Wishlist</div>
            <div className="continue_shopping">
              <PageTransition to="/">Continue Shopping</PageTransition>
            </div>
          </div>
        )}

        <div className="productList_wrapper">
          {wishListProducts?.map((item) => (
            <ProductItem key={item._id} {...item} />
          ))}
        </div>
        {(wishListProducts?.length < 1 || wishListProducts === undefined) && (
          <div className="empty_wishlist">
            <div className="empty_wishlist_image">
              <img src={emptyWishlist} alt="empty-wishlist" />
            </div>
            There is no product in Wishlist, to add product in Wishlist then
            click {""}
            <Link to={"/"}>here</Link>
          </div>
        )}
      </div>
    </div>
  );
};
export default WishList;
