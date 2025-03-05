// import { Link } from "react-router-dom";
import Logout from "../logout/Logout";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getProfile } from "../../features/authSlice";
import useUserProfile from "../../customHooks/useUserProfile/UseUserProfile";
import "./header.scss";
import useLogin from "../../customHooks/useLogin/UseLogin";
import wishlist from "../../images/wishlist.svg";
import cart from "../../images/cart.svg";
import { fetchProduct } from "../../features/cartSlice";
import PageTransition from "../pageTransition/PageTransition";
import { getWishlistItem } from "../../features/wishlistSlice";
import logo from "../../images/mainLogo.png";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";

const Header = () => {
  const [toggleProfile, setToggleProfile] = useState(false);
  const dispatch = useDispatch();
  const profile = useUserProfile();
  const login = useLogin();

  const cartLoading = useSelector((item) => item?.cart?.loading);
  const wishlistLoading = useSelector((item) => item?.wishlist?.loading);

  const profileName = profile?.firstName
    ? profile?.firstName
    : profile?.data?.firstName;
  useEffect(() => {
    const storedProfile = localStorage.getItem("profile");
    if (storedProfile) {
      dispatch(getProfile());
    }
    if (login) {
      dispatch(fetchProduct());
      dispatch(getWishlistItem());
    }
  }, [dispatch, login]);

  useEffect(() => {
    setToggleProfile(false);
  }, []);

  const handleToggleProfile = () => {
    setToggleProfile(!toggleProfile);
  };
  const cartProducts = useSelector((cart) => cart?.cart?.cart?.data);

  const wishListProducts = useSelector(
    (state) => state?.wishlist?.wishlist?.data
  );

  return (
    <header>
      <nav>
        <div className="logo">
          <PageTransition to={"/"} profile={() => setToggleProfile(false)}>
            <img src={logo} alt="logo" />
          </PageTransition>
        </div>
        <div className="profile">
          {profile && (
            <ul className="nav_links">
              <li className="mobile">
                {cartLoading ? (
                  <SkeletonTheme baseColor="#e0e0e0" highlightColor="#303954">
                    <Skeleton width={20} height={20} duration={0.8} />
                  </SkeletonTheme>
                ) : (
                  <PageTransition
                    to={"/cart"}
                    profile={() => setToggleProfile(false)}
                  >
                    <img src={cart} alt="cart" />
                    {cartProducts?.length > 0 && (
                      <sup>
                        <span>
                          {cartProducts?.length > 0 && cartProducts?.length}
                        </span>
                      </sup>
                    )}
                  </PageTransition>
                )}
              </li>
              <li className="desktop">
                {cartLoading ? (
                  <SkeletonTheme baseColor="#e0e0e0" highlightColor="#303954">
                    <Skeleton width={40} height={20} duration={0.8} />
                  </SkeletonTheme>
                ) : (
                  <PageTransition
                    to={"/cart"}
                    profile={() => setToggleProfile(false)}
                  >
                    Cart
                    {cartProducts?.length > 0 && (
                      <sup>
                        <span>{cartProducts?.length}</span>
                      </sup>
                    )}
                  </PageTransition>
                )}
              </li>
              <li className="mobile">
                {wishlistLoading ? (
                  <SkeletonTheme baseColor="#e0e0e0" highlightColor="#303954">
                    <Skeleton width={20} height={20} duration={0.8} />
                  </SkeletonTheme>
                ) : (
                  <PageTransition
                    profile={() => setToggleProfile(false)}
                    to="/wishlist"
                  >
                    <img src={wishlist} alt="wishlist" />
                    {wishListProducts?.length > 0 && (
                      <sup>
                        <span>{wishListProducts?.length}</span>
                      </sup>
                    )}
                  </PageTransition>
                )}
              </li>
              <li className="desktop">
                {wishlistLoading ? (
                  <SkeletonTheme baseColor="#e0e0e0" highlightColor="#303954">
                    <Skeleton width={60} height={20} duration={0.8} />
                  </SkeletonTheme>
                ) : (
                  <PageTransition
                    profile={() => setToggleProfile(false)}
                    to="/wishlist"
                  >
                    Wishlist
                    {wishListProducts?.length > 0 && (
                      <sup>
                        <span>
                          {wishListProducts?.length > 0 &&
                            wishListProducts?.length}
                        </span>
                      </sup>
                    )}
                  </PageTransition>
                )}
              </li>
              <li className="desktop">
                <PageTransition
                  profile={() => setToggleProfile(false)}
                  to="/order-history"
                >
                  All Orders
                </PageTransition>
              </li>
              <li className="mobile">
                <PageTransition
                  profile={() => setToggleProfile(false)}
                  to="/order-history"
                >
                  All Orders
                </PageTransition>
              </li>
            </ul>
          )}
          {profile && (
            <>
              <p onClick={handleToggleProfile}>{profileName.slice(0, 2)}</p>
              <ul
                className={`profileInfo ${
                  toggleProfile ? "showProfile" : "hideProfile"
                }`}
              >
                <li>
                  <PageTransition
                    profile={() => setToggleProfile(false)}
                    to="/profile"
                  >
                    Show Profile
                  </PageTransition>
                </li>
                <li onClick={() => setToggleProfile(false)}>
                  <Logout />
                </li>
              </ul>
            </>
          )}
        </div>
      </nav>
    </header>
  );
};
export default Header;
