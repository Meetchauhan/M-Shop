import { useEffect } from "react";
import Products from "../../adminPanel/products/Products";

function Dashboard() {
  useEffect(() => {
    document.title = "Dashboard";
  }, []);
  return <Products />;
}

export default Dashboard;
