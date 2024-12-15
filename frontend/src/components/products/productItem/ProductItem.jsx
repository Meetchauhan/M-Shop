import PropTypes from "prop-types";
import "./productItem.scss";
import { useDispatch, useSelector } from "react-redux";

import wishlist from "../../../images/wishlist.svg";
import wishlist2 from "../../../images/wishlist2.svg";
import { addToCart, fetchProduct } from "../../../features/cartSlice";
import { useLocation } from "react-router-dom";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { useState } from "react";
import currency from "../../../images/currency.svg";
import AddToCartBtn from "../../buttons/addToCart/AddToCart";
import {
  addToWishlist,
  getWishlistItem,
  removeWishlist,
} from "../../../features/wishlistSlice";

const ProductItem = ({
  productId,
  name,
  price,
  image,
  quantity,
  isProductAvailable,
}) => {
  const [isImageLoading, setIsImageLoading] = useState(false);
  const dispatch = useDispatch();
  const location = useLocation();
  const wishlistItem = useSelector((state) => state?.wishlist?.wishlist);

  const handleCart = () => {
    dispatch(addToCart({ productId, name, price, image, quantity: 1 })).then(
      () => dispatch(fetchProduct())
    );
  };
  const handleWishList = () => {
    const isWishlisted = wishlistItem?.data;

    const isProductInWishlist = isWishlisted?.some(
      (item) => item.productId === productId
    );
    if (isProductInWishlist) {
      dispatch(
        removeWishlist({ productId, name, price, image, quantity })
      ).then(() => dispatch(getWishlistItem()));
    } else {
      dispatch(addToWishlist({ productId, name, price, image, quantity })).then(
        () => dispatch(getWishlistItem())
      );
    }
  };

  return (
    <div className="productItem">
      <div className="productItem_wrapper">
        <div className="product_image">
          {!isImageLoading && (
            <SkeletonTheme baseColor="#e0e0e0" highlightColor="#f5f5f5">
              <Skeleton width={"100%"} height={"250px"} duration={0.8} />
            </SkeletonTheme>
          )}
          <img
            src={image}
            alt={productId}
            style={{
              display: isImageLoading ? "block" : "none",
            }}
            onLoad={() => {
              setIsImageLoading(true);
            }}
          />
        </div>
        <div className="productdetail_wrapper">
          <h6> {name}</h6>
          <div className="price">
            <img src={currency} alt="currency" />
            <span> {price.toLocaleString("en-IN")}</span>
          </div>
          {quantity && <h6>Quantity : {quantity}</h6>}

          {isProductAvailable > 0 ? (
            <div className="btns">
              {location.pathname !== "/cart" && (
                <AddToCartBtn title={"Add to Cart"} onClick={handleCart} />
              )}
              <div className="wishlistBtn" onClick={handleWishList}>
                {wishlistItem?.data?.some(
                  (item) => item.productId === productId
                ) ? (
                  <img src={wishlist} alt="wishlist" />
                ) : (
                  <img src={wishlist2} alt="wishlist" />
                )}
              </div>
            </div>
          ) : (
            <div className="">Soldout</div>
          )}
        </div>
      </div>
    </div>
  );
};
export default ProductItem;

ProductItem.propTypes = {
  productId: PropTypes.string,
  name: PropTypes.string,
  price: PropTypes.number,
  image: PropTypes.string,
  quantity: PropTypes.number,
  isProductAvailable : PropTypes.number
};
