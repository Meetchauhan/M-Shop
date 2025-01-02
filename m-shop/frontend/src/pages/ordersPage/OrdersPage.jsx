import { useEffect, useState } from "react";
import "./ordersPage.scss";
import { useDispatch, useSelector } from "react-redux";
import { adminAllOrders } from "../../features/ordersSlice";
import currency from "../../images/currency.svg";
import { useFormik } from "formik";
import { orderStatus } from "../../features/orderStatusSlice";

const OrdersPage = () => {
  const [handleStatus, setHandleStatus] = useState(null);
  const dispatch = useDispatch();
  const allOrders = useSelector(
    (orders) => orders?.orders?.adminAllOrders?.data
  );
  useEffect(() => {
    dispatch(adminAllOrders());
  }, [dispatch]);

  const handleOrderStatus = (orderId) => {
    setHandleStatus(orderId);
  };

  const { handleSubmit, handleChange, values } = useFormik({
    initialValues: {
      Status: "",
    },
    onSubmit: (value, action) => {
      console.log("value status", value);
      dispatch(
        orderStatus({ orderId: handleStatus, status: value.Status })
      ).then(() => dispatch(adminAllOrders()));

      setHandleStatus(false);
      action.resetForm();
    },
  });
  console.log("status id", handleStatus);

  return (
    <div className="ordersPage">
      <div className="ordersPage_inner">
        <table>
          <tbody>
            <tr className="ordersPage_wrap">
              <td className="ordersPage_orders">Orders</td>
              <td className="ordersPage_date">Date</td>
              <td className="ordersPage_customers">Customers</td>
              <td className="ordersPage_total">Total</td>
              <td className="ordersPage_payment">Payment Status</td>
              <td className="ordersPage_status">Status</td>
            </tr>
            {allOrders?.map((item) => (
              <tr key={item._id}>
                <td className="ordersPage_orders">M-{item?.orderNumber}</td>
                <td className="ordersPage_date">{item?.formatedDate}</td>
                <td className="ordersPage_customers">
                  {item?.firstName} {item?.lastName}
                </td>
                <td className="ordersPage_total">
                  <img src={currency} alt="currency" />
                  {item?.totalAmount?.toLocaleString("en-IN")}
                </td>
                <td className="ordersPage_payment">Paid</td>
                <td
                  className="ordersPage_status"
                  onClick={() => handleOrderStatus(item?._id)}
                >
                  {item?.status}
                  {handleStatus === item?._id && (
                    <div className="statusModel">
                      <form onSubmit={handleSubmit}>
                        <select
                          name="Status"
                          value={values.Status}
                          onChange={handleChange}
                          onSubmit={handleSubmit}
                        >
                          <option value="Pending">Pending</option>
                          <option value="Shipped">Shipped</option>
                          <option value="Dispatch">Dispatch</option>
                          <option value="Out of delivery">
                            Out of delivery
                          </option>
                          <option value="Cancel">Cancel</option>
                        </select>
                        <button>Submit</button>
                      </form>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
export default OrdersPage;
