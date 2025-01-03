import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { handleCategoryFilter } from "../../features/categoryFilterSlice";
import { useEffect } from "react";
import "./selectFilter.scss"

const SelectFilter = () => {
  const dispatch = useDispatch();
  const getAllProducts = useSelector(
    (state) => state?.products?.products?.data
  );
  const initialValue = {
    category: "",
  };

  const { handleChange, values } = useFormik({
    initialValues: initialValue,
  });

  useEffect(() => {
    dispatch(handleCategoryFilter(values));
  }, [dispatch, values]);

  console.log("filter category :", values);

  return (
    <form className="category_filter"> 
      <select
        name="category"
        id=""
        onChange={handleChange}
        value={values.category}
      >
        <option value="" disabled>
          Select Category
        </option>
        <option value="All">All</option>
        {[...new Set(getAllProducts?.map((item) => item?.category))]?.map(
          (item, index) => (
            <option value={item} key={index}>
              {item}
            </option>
          )
        )}
      </select>
    </form>
  );
};
export default SelectFilter;
