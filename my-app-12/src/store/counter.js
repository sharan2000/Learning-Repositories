import { createSlice } from "@reduxjs/toolkit";

const initialCounterState = {
  counter: 0,
  displayCounter: true
}

const counterSlice = createSlice({
  name: 'counter',
  initialState: initialCounterState,
  reducers: {
    increment: (state) => { state.counter++; },
    decrement: (state) => { state.counter--; },
    increase: (state, action) => { state.counter += action.payload; },
    toggle: (state) => { state.displayCounter = !state.displayCounter; }
  }
});

export const counterSliceActions = counterSlice.actions;
export default counterSlice.reducer;