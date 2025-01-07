import { useDispatch, useSelector } from "react-redux";
import "./orderHistory.scss";
import { useEffect } from "react";
import { allOrders } from "../../features/ordersSlice";
import AllOrders from "../../components/allOrders/AllOrders";
import { Link } from "react-router-dom";

const OrderHistory = () => {
  const dispatch = useDispatch();
  const orders = useSelector((orders) => orders?.orders?.orders?.data);
  console.log("all orders", orders);

  useEffect(() => {
    dispatch(allOrders());
  }, [dispatch]);
  return (
    <div className="orderStatus">
      <div className="container">
        <h2>Order History</h2>
        {orders?.map((item) => (
          <AllOrders orders={item} key={item._id} />
        ))}
        {orders?.length < 1 && (
          <p>
            You didn't have any order click <Link to="/">here</Link> to order.
          </p>
        )}
      </div>
    </div>
  );
};
export default OrderHistory;
