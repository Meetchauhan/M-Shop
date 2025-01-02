import { useSelector } from "react-redux";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const CardLoader = () => {
  const loader = useSelector((state) => state?.products?.loading);
  console.log("loader", loader);

  return loader &&  <Skeleton containerClassName="productItem" width={"300px"} height={"300px"} />;
};

export default CardLoader;  
