// import { createStore } from "redux";
import { createSlice, configureStore } from "@reduxjs/toolkit";

// const reducerFunction = (
//   state = { userSearchText: "", locationSearchText: "" },
//   action
// ) => {
//   if (action.type === "user") {
//     return {
//       ...state,
//       userSearchText: action.value
//     };
//   } else if (action.type === "location") {
//     return {
//       ...state,
//       locationSearchText: action.value
//     };
//   }
// };

const slice = createSlice({
  name: "search",
  initialState: {
    userSearchText: "",
    locationSearchText: ""
  },
  reducers: {
    updateUser(state, action) {
      return {
        ...state,
        userSearchText: action.payload.value
      };
    },

    updateLocation(state, action) {
      return {
        ...state,
        locationSearchText: action.payload.value
      };
    }
  }
});

// const store = createStore(reducerFunction);

const store = configureStore({
  reducer: { search: slice.reducer }
});

export const searchActions = slice.actions;

export default store;
