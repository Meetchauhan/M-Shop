import { useEffect } from "react";
import "./thankyou.scss";
import { useDispatch, useSelector } from "react-redux";
import { fetchProduct } from "../../features/cartSlice";
import { useNavigate } from "react-router-dom";
import Orders from "../../components/orders/Orders";
import OrderInfo from "../../components/orderInfo/OrderInfo";
import currency from "../../images/currency.svg";
import { orderMail } from "../../features/orderMailSlice";

const Thankyou = () => {
  const navigate = useNavigate();
  const recentOrders = useSelector((order) => order?.thankyou?.order);
  console.log("recent orders", recentOrders);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchProduct());
    if (recentOrders?.length < 1) {
      navigate("/order-history", { replace: true });
    }
    dispatch(orderMail(recentOrders?.order));
  }, [dispatch, recentOrders, navigate]);
  return (
    <div className="thankyou">
      <div className="container">
        <h2>{recentOrders?.message}</h2>
        <div className="recent_orders">
          <div className="recent_orders_wrap">
            {recentOrders?.order?.cart?.map((item) => (
              <Orders
                key={item._id}
                title={item.name}
                image={item.image}
                quantity={item.quantity}
                amount={item.price}
              />
            ))}
          </div>
          <div className="recent_orders_totalAmount">
            Total Amount :{" "}
            <span>
              <img src={currency} alt="currency" />
              {recentOrders?.order?.totalAmount?.toLocaleString("en-IN")}
            </span>
          </div>
        </div>
        <OrderInfo
          firstName={recentOrders?.order?.firstName}
          lastName={recentOrders?.order?.lastName}
          address={recentOrders?.order?.address}
          email={recentOrders?.order?.email}
          phone={recentOrders?.order?.phone}
          city={recentOrders?.order?.city}
          state={recentOrders?.order?.state}
          pincode={recentOrders?.order?.pincode}
        />
      </div>
    </div>
  );
};
export default Thankyou;
