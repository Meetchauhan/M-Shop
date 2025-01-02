import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteUser,
  getAllUser,
  updateUserByAdmin,
} from "../../features/userSlice";
import "./users.scss";
import "../../adminPanel/products/products.scss";
import { openUpdateUserByAdminModel } from "../../features/productModelSlice";

import UpdateUserByAdminModel from "../../components/model/UpdateUserByAdminModel";

const Users = () => {
  const [userToUpdate, setUserToUpdate] = useState(null);
  const dispatch = useDispatch();
  const users = useSelector((state) => state?.allUser?.data?.data);
  const handleModel = useSelector(
    (state) => state?.handleProductModel?.updateUserAdminModel
  );
  console.log("handle model", handleModel);

  useEffect(() => {
    dispatch(getAllUser());
  }, [dispatch]);

  const handleUpdate = async (id, updatedData) => {
    await dispatch(updateUserByAdmin({ id, userData: updatedData })).then(() =>
      dispatch(getAllUser())
    );
  };

  // Open the update form modal
  const handleOpenUpdateForm = (user) => {
    setUserToUpdate(user); // Set the user to update
    dispatch(openUpdateUserByAdminModel());
  };

  const handleDelete = (id) => {
    dispatch(deleteUser(id)).then(() => dispatch(getAllUser()));
  };

  console.log("updated user", userToUpdate);

  return (
    <div className="users">
      <div className="container">
        <div className="user_inner">
          <table>
            <tbody>
              <tr className="user_wrap">
                <td className="user_name">User Name</td>
                <td className="user_email">Email</td>
                <td className="user_password">Password</td>
                <td className="deleteIcon">Delete Product</td>
                <td className="deleteIcon">Edit Product</td>
              </tr>
              {users?.map((item) => (
                <tr key={item._id}>
                  <td>
                    {item?.firstName} {item?.lastName}
                  </td>
                  <td>{item?.email}</td>
                  <td>{item?.password}</td>
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
                      dispatch(openUpdateUserByAdminModel());
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
        </div>
        {handleModel && (
          <UpdateUserByAdminModel
            user={userToUpdate}
            onSubmit={(updatedData) =>
              handleUpdate(userToUpdate._id, updatedData)
            }
          />
        )}
      </div>
    </div>
  );
};
export default Users;