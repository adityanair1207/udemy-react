import React from "react";
import { createStore } from "redux";
import {configureStore, createSlice} from "@reduxjs/toolkit";

const initialState = { counter: 0, showCounter: true };

const counterSlice = createSlice({
  name: "counter",
  initialState, // initialState: initialState
  reducers: { // map of all the reducers this slice needs
    increment(state){ // name of methods can be as required
      state.counter++; // changing/mutating state is allowed here
    },
    decrement(state){
      state.counter--;
    },
    increase(state, action){
      state.counter = state.counter + action.payload;
    },
    toggleCounter(state){
      state.showCounter = !state.showCounter;
    }
  }
});

// const store = createStore(counterSlice.reducers); // if we have only one slice (as in this example)

const store = configureStore({
  reducer: counterSlice.reducer
});

// const store = configureStore({
//   reducer: {
//     counter: counterSlice.reducer,
//     // other reducers can be mapped and configureStore will merge them into a single reducer
//   }
// });

export const counterActions = counterSlice.actions;
export default store;
