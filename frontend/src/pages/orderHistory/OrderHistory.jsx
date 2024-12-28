import { useDispatch, useSelector } from "react-redux";
import "./orderHistory.scss";
import { useEffect } from "react";
import { allOrders } from "../../features/ordersSlice";
import AllOrders from "../../components/allOrders/AllOrders";

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
      </div>
    </div>
  );
};
export default OrderHistory;
