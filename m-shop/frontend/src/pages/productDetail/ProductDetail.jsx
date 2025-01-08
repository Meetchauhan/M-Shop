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
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import SimilarProduct from "../../components/products/similarProducts/SimilarProduct";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import Heading from "../../components/heading/Heading";

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
            {thisProduct?.category && (
              <div className="category">Category : {thisProduct?.category}</div>
            )}
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
        <div className="productList_wrapper">
          <Heading title={"Similar Products"} />
          <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            spaceBetween={20}
            slidesPerView={4}
            navigation={{
              nextEl: ".custom-next",
              prevEl: ".custom-prev",
            }}
            pagination={{ clickable: true }}
            onSwiper={(swiper) => console.log(swiper)}
            onSlideChange={() => console.log("slide change")}
            loop={"true"}
            speed={1000}
            autoplay={{
              delay: 3000,
              disableOnInteraction: false,
            }}
            breakpoints={{
              200: {
                slidesPerView: 1,
              },
              576: {
                slidesPerView: 2,
              },
              990: {
                slidesPerView: 3,
                spaceBetween: 20,
              },
              1198: {
                slidesPerView: 4,
                spaceBetween: 40,
              },
            }}
          >
            {getAllProducts
              ?.filter(
                (item) =>
                  item._id !== thisProduct?._id &&
                  item.category === thisProduct?.category
              )
              .map((item) => (
                <SwiperSlide key={item._id}>
                  <SimilarProduct
                    key={item._id}
                    productId={item._id}
                    name={item.name}
                    price={item.price}
                    image={item.image}
                    quantity={item.quantity}
                    totalQuantity={item.quantity}
                  />
                </SwiperSlide>
              ))}
            <div className="navigation_arrow">
              <div className="custom-prev">
                <svg
                  clipRule="evenodd"
                  fillRule="evenodd"
                  strokeLinejoin="round"
                  strokeMiterlimit="2"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="m12.017 1.995c5.517 0 9.997 4.48 9.997 9.998s-4.48 9.998-9.997 9.998c-5.518 0-9.998-4.48-9.998-9.998s4.48-9.998 9.998-9.998zm0 1.5c-4.69 0-8.498 3.808-8.498 8.498s3.808 8.498 8.498 8.498 8.497-3.808 8.497-8.498-3.807-8.498-8.497-8.498zm-1.528 4.715s-1.502 1.505-3.255 3.259c-.147.147-.22.339-.22.531s.073.383.22.53c1.753 1.754 3.254 3.258 3.254 3.258.145.145.335.217.526.217.192-.001.384-.074.531-.221.292-.293.294-.766.003-1.057l-1.977-1.977h6.693c.414 0 .75-.336.75-.75s-.336-.75-.75-.75h-6.693l1.978-1.979c.29-.289.287-.762-.006-1.054-.147-.147-.339-.221-.53-.222-.19 0-.38.071-.524.215z"
                    fillRule="nonzero"
                  />
                </svg>
              </div>
              <div className="custom-next">
                <svg
                  clipRule="evenodd"
                  fillRule="evenodd"
                  strokeLinejoin="round"
                  strokeMiterlimit="2"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="m12.012 1.995c-5.518 0-9.998 4.48-9.998 9.998s4.48 9.998 9.998 9.998 9.997-4.48 9.997-9.998-4.479-9.998-9.997-9.998zm0 1.5c4.69 0 8.497 3.808 8.497 8.498s-3.807 8.498-8.497 8.498-8.498-3.808-8.498-8.498 3.808-8.498 8.498-8.498zm1.528 4.715s1.502 1.505 3.255 3.259c.146.147.219.339.219.531s-.073.383-.219.53c-1.753 1.754-3.254 3.258-3.254 3.258-.145.145-.336.217-.527.217-.191-.001-.383-.074-.53-.221-.293-.293-.295-.766-.004-1.057l1.978-1.977h-6.694c-.414 0-.75-.336-.75-.75s.336-.75.75-.75h6.694l-1.979-1.979c-.289-.289-.286-.762.006-1.054.147-.147.339-.221.531-.222.19 0 .38.071.524.215z"
                    fillRule="nonzero"
                  />
                </svg>
              </div>
            </div>
          </Swiper>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;

ProductDetail.propTypes = {
  title: PropTypes.string,
};
