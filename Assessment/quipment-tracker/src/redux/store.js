import { configureStore } from "@reduxjs/toolkit";
import equipmentReducer from "../features/listSlice";

const store = configureStore({
  reducer: {
    equipment: equipmentReducer,
  },
});

export default store;