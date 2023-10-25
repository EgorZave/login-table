import { configureStore } from "@reduxjs/toolkit";
import loginSlice from "./loginSlice";
import tableSlice from "./tableSlice";

const store = configureStore({
   reducer: {
      login: loginSlice,
      table: tableSlice
   }
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>

export default store;

