import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import {
  allProducts,
  deleteProduct,
  updateProduct,
} from "../../../src/features/productSlice";
import { openUpdateProductModel } from "../../../src/features/productModelSlice";
import "./products.scss";
import CreateProductModel from "../../components/model/CreateProductModel";
import UpdateProductModel from "../../components/model/UpdateProductModel";
import AddProductBtn from "../../components/buttons/AddProductBtn";

function Products() {
  const [productToUpdate, setProductToUpdate] = useState(null);
  const product = useSelector((state) => state?.products?.products?.data);
  const dispatch = useDispatch();
  const handleProductModel = useSelector(
    (state) => state.handleProductModel.addProductModel
  );

  const handleUpdateProductModel = useSelector(
    (state) => state.handleProductModel.updateProductModel
  );

  useEffect(() => {
    dispatch(allProducts());
  }, [dispatch]);

  const handleDelete = (id) => {
    dispatch(deleteProduct(id)).then(() => {
      dispatch(allProducts());
    });
  };

  const handleUpdate = (id, formData) => {
    dispatch(updateProduct({ id, productData: formData })).then(() => {
      dispatch(allProducts());
    });
  };

  const handleOpenUpdateForm = (product) => {
    setProductToUpdate(product);
  };

  return (
    <div className="products">
      <div className="container">
        <div className="products_inner">
          <table>
            <tbody>
              <tr className="product_wrap">
                <td className="index">Index</td>
                <td className="product_image">Image</td>
                <td className="product_name">Product Name</td>
                <td className="product_price">Product Price</td>
                <td className="product_quantity">Product Quantity</td>
                <td className="deleteIcon">Delete Product</td>
                <td className="deleteIcon">Edit Product</td>
              </tr>
              {product?.map((item, index) => (
                // <li key={item._id}>
                <tr className="product_wrap" key={item._id}>
                  <td className="index">{index + 1}</td>
                  <td className="product_image">
                    <img src={item.image} alt={item.name} />
                  </td>
                  <td className="product_name">{item.name}</td>
                  <td className="product_price">{item.price}.00</td>
                  <td className="product_price">
                    {item.quantity ? item.quantity : 0}
                  </td>

                  <td
                    onClick={() => handleDelete(item._id)}
                    className="deleteIcon"
                  >
                    <svg
                      clipRule="evenodd"
                      fillRule="evenodd"
                      strokeLinejoin="round"
                      strokeMiterlimit="2"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="m4.015 5.494h-.253c-.413 0-.747-.335-.747-.747s.334-.747.747-.747h5.253v-1c0-.535.474-1 1-1h4c.526 0 1 .465 1 1v1h5.254c.412 0 .746.335.746.747s-.334.747-.746.747h-.254v15.435c0 .591-.448 1.071-1 1.071-2.873 0-11.127 0-14 0-.552 0-1-.48-1-1.071zm14.5 0h-13v15.006h13zm-4.25 2.506c-.414 0-.75.336-.75.75v8.5c0 .414.336.75.75.75s.75-.336.75-.75v-8.5c0-.414-.336-.75-.75-.75zm-4.5 0c-.414 0-.75.336-.75.75v8.5c0 .414.336.75.75.75s.75-.336.75-.75v-8.5c0-.414-.336-.75-.75-.75zm3.75-4v-.5h-3v.5z"
                        fillRule="nonzero"
                      />
                    </svg>
                  </td>
                  <td
                    onClick={() => {
                      handleOpenUpdateForm(item);
                      dispatch(openUpdateProductModel());
                    }}
                    className="updateIcon"
                  >
                    <svg
                      clipRule="evenodd"
                      fillRule="evenodd"
                      strokeLinejoin="round"
                      strokeMiterlimit="2"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="m11.25 6c.398 0 .75.352.75.75 0 .414-.336.75-.75.75-1.505 0-7.75 0-7.75 0v12h17v-8.749c0-.414.336-.75.75-.75s.75.336.75.75v9.249c0 .621-.522 1-1 1h-18c-.48 0-1-.379-1-1v-13c0-.481.38-1 1-1zm1.521 9.689 9.012-9.012c.133-.133.217-.329.217-.532 0-.179-.065-.363-.218-.515l-2.423-2.415c-.143-.143-.333-.215-.522-.215s-.378.072-.523.215l-9.027 8.996c-.442 1.371-1.158 3.586-1.264 3.952-.126.433.198.834.572.834.41 0 .696-.099 4.176-1.308zm-2.258-2.392 1.17 1.171c-.704.232-1.274.418-1.729.566zm.968-1.154 7.356-7.331 1.347 1.342-7.346 7.347z"
                        fillRule="nonzero"
                      />
                    </svg>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <AddProductBtn />
        </div>
      </div>
      {handleUpdateProductModel && (
        <UpdateProductModel
          product={productToUpdate}
          onSubmit={(formData) => handleUpdate(productToUpdate._id, formData)}
        />
      )}
      {handleProductModel && <CreateProductModel />}
    </div>
  );
}

export default Products;
