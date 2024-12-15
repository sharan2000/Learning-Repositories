import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [],
    totalQuantity: 0,
    changed: false
  },
  reducers: {
    add: (state, action) => {
      let item = state.items.find(item => item.id === action.payload.id);
      if(item) {
        item.quantity++;
        item.total += item.price;
      } else {
        state.items.push({ ...action.payload, quantity: 1, total: action.payload.price });
      }
      state.totalQuantity++;
      state.changed = true;
    },
    remove: (state, action) => {
      let itemIndex = state.items.findIndex(item => item.id === action.payload);
      if(state.items[itemIndex].quantity === 1) {
        state.items.splice(itemIndex, 1);
      } else {
        state.items[itemIndex].quantity -= 1;
        state.items[itemIndex].total -= state.items[itemIndex].price;
      }
      state.totalQuantity--;
      state.changed = true;
    },
    replace: (state, action) => {
      state.items = action.payload.items;
      state.totalQuantity = action.payload.totalQuantity;
    }
  }
})

export const cartActions = cartSlice.actions;
export default cartSlice.reducer;