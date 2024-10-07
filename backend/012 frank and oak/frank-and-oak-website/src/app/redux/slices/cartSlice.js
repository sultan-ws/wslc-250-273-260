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
        }
    }
});

export const {loadData} = cartSlice.actions;

export default cartSlice.reducer