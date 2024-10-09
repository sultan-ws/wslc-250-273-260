import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    value:[]
};

export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers:{
        loadData : (state, action)=>{
            state.value = action.payload;

            console.log('cart:', action.payload);
        },
        deleteProductFromCart:(state, action)=>{
            state.value = state.value.filter((cartPro)=> cartPro._id !== action.payload);
        },
        updateProductQuentity:(state, action) =>{
            state.value = action.payload;
        }
    }
});

export const {loadData, deleteProductFromCart, updateProductQuentity} = cartSlice.actions;

export default cartSlice.reducer