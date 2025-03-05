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
      document.body.style.overflow = "hidden"
    },
    closeAddProductModel: (state) => {
      state.addProductModel = false;
      document.body.style.overflow = "auto"
    },
    openUpdateProductModel: (state) => {
      state.updateProductModel = true;
      document.body.style.overflow = "hidden"
    },
    closeUpdateProductModel: (state) => {
      state.updateProductModel = false;
       document.body.style.overflow = "auto"
    },
    openUserEditModel: (state) => {
      state.editUser = true;
      document.body.style.overflow = "hidden"
    },
    closeUserEditModel: (state) => {
      state.editUser = false;
      document.body.style.overflow = "auto"
    },
    openUpdateUserByAdminModel: (state) => {
      state.updateUserAdminModel = true;
      document.body.style.overflow = "hidden"
      console.log("open-----------");
    },
    closeUpdateUserByAdminModel: (state) => {
      state.updateUserAdminModel = false;
       document.body.style.overflow = "auto"
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
