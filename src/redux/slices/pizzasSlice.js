import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchPizzas = createAsyncThunk(
  "pizza/fetchPizzasStatus",
  async ({ category, sortBy, search, pizzasPerPage, currentPage }) => {
    const pizzasResponse = await axios.get(
      `https://6499a51979fbe9bcf83fb147.mockapi.io/items?page=${currentPage}&limit=${pizzasPerPage}&${category}sortBy=${sortBy}${search}`
    );

    return pizzasResponse.data;
  }
);

const initialState = {
  items: [],
  status: "loading", // loading | success| error
};

export const pizzasSlice = createSlice({
  name: "pizza",
  initialState,
  reducers: {
    setItems(state, action) {
      state.items = action.payload;
    },
  },
  extraReducers: {
    [fetchPizzas.pending]: (state) => {
      state.status = "loading";
      state.items = [];
    },

    [fetchPizzas.fulfilled]: (state, action) => {
      state.items = action.payload;
      state.status = "success";
    },

    [fetchPizzas.rejected]: (state, action) => {
      state.status = "error";
      state.items = [];
    },
  },
});

export const { setItems } = pizzasSlice.actions;

export default pizzasSlice.reducer;
