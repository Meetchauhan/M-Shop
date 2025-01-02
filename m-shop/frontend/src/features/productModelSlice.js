import { createSlice } from "@reduxjs/toolkit";

const ProductModelSlice = createSlice({
  name: "handleProductModel",
  initialState: {
    addProductModel: false,
    updateProductModel: false,
    editUser: false,
    updateUserAdminModel: false,
  },
  reducers: {
    openAddProductModel: (state) => {
      state.addProductModel = true;
    },
    closeAddProductModel: (state) => {
      state.addProductModel = false;
    },
    openUpdateProductModel: (state) => {
      state.updateProductModel = true;
    },
    closeUpdateProductModel: (state) => {
      state.updateProductModel = false;
    },
    openUserEditModel: (state) => {
      state.editUser = true;
    },
    closeUserEditModel: (state) => {
      state.editUser = false;
    },
    openUpdateUserByAdminModel: (state) => {
      state.updateUserAdminModel = true;
      console.log("open-----------");
    },
    closeUpdateUserByAdminModel: (state) => {
      state.updateUserAdminModel = false;
      console.log("close-----------");
      
    },
  },
});

export const {
  openAddProductModel,
  closeAddProductModel,
  openUpdateProductModel,
  closeUpdateProductModel,
  openUserEditModel,
  closeUserEditModel,
  openUpdateUserByAdminModel,
  closeUpdateUserByAdminModel,
} = ProductModelSlice.actions;
export default ProductModelSlice.reducer;
