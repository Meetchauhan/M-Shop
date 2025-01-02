import PropTypes from "prop-types";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { allProducts } from "../../features/productSlice";
import { addToCart, fetchProduct } from "../../features/cartSlice";
import AddToCartBtn from "../../components/buttons/addToCart/AddToCart";
import currency from "../../images/currency.svg";
import {
  addToWishlist,
  getWishlistItem,
  removeWishlist,
} from "../../features/wishlistSlice";
import wishlist from "../../images/wishlist.svg";
import wishlist2 from "../../images/wishlist2.svg";
import "./productDetail.scss";

const ProductDetail = () => {
  const dispatch = useDispatch();
  const wishlistItem = useSelector((state) => state?.wishlist?.wishlist);

  const getAllProducts = useSelector(
    (state) => state?.products?.products?.data
  );

  const { name } = useParams();

  useEffect(() => {
    dispatch(allProducts());
  }, [dispatch]);

  const thisProduct = getAllProducts?.find((prod) => prod?.name === name);
  console.log("this product", thisProduct);

  if (!thisProduct) {
    return <div>Product not found.</div>;
  }
  const handleCart = () => {
    dispatch(
      addToCart({
        productId: thisProduct?._id,
        name: thisProduct?.name,
        price: thisProduct?.price,
        image: thisProduct?.image,
      })
    ).then(() => dispatch(fetchProduct()));
  };
  const handleWishList = () => {
    const isWishlisted = wishlistItem?.data;

    const isProductInWishlist = isWishlisted?.some(
      (item) => item.productId === thisProduct?._id
    );
    if (isProductInWishlist) {
      dispatch(
        removeWishlist({
          productId: thisProduct?._id,
          name: thisProduct?.name,
          price: thisProduct?.price,
          image: thisProduct?.image,
        })
      ).then(() => dispatch(getWishlistItem()));
    } else {
      dispatch(
        addToWishlist({
          productId: thisProduct?._id,
          name: thisProduct?.name,
          price: thisProduct?.price,
          image: thisProduct?.image,
        })
      ).then(() => dispatch(getWishlistItem()));
    }
  };
  return (
    <div className="productDetail">
      <div className="container">
        <div className="productDetail_wrap">
          <div className="productDetail_wrap_image">
            <img src={thisProduct.image} alt={thisProduct.name} />
          </div>
          <div className="productDetail_wrap_detail">
            <h2>{thisProduct.name}</h2>
            <p>
              Amount:{" "}
              <span>
                <img src={currency} alt="currency" />
              </span>
              {thisProduct.price}
            </p>
            <div className="productDetail_wrap_btns">
              <AddToCartBtn title={"Add to Cart"} onClick={handleCart} />
              <div className="wishlistBtn" onClick={handleWishList}>
                {wishlistItem?.data?.some(
                  (item) => item.productId === thisProduct?._id
                ) ? (
                  <img src={wishlist} alt="wishlist" />
                ) : (
                  <img src={wishlist2} alt="wishlist" />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;

ProductDetail.propTypes = {
  title: PropTypes.string,
};
