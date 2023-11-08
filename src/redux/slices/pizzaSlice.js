import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchPizzas = createAsyncThunk('pizza/fetchPizzasStatus', async (params, thunkAPI) => {
    const {category, sortBy, order, search, currentPage} = params
    const  { data } = await axios.get(`https://6544d6275a0b4b04436d1080.mockapi.io/items?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}${search}`
    );
    return data
    }
  )

const initialState = {
    items: [],
    status: 'loading', //loading | success | error
  };

export const pizzaSlice = createSlice({
  name: "pizza",
  initialState,
  reducers: {
    setItems(state, action) {
        state.items = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchPizzas.pending, (state) => {  
      state.items = [];
      state.status = 'loading'
    });
    builder.addCase(fetchPizzas.fulfilled, (state, action) => {
      state.items = action.payload;   
      state.status = 'success'
    });
    builder.addCase(fetchPizzas.rejected, (state, action) => {
      state.items = [];
      state.status = 'error';
    });
  },
}); 

export const selectPizzaData = (state) => state.pizzaSlice;


export const { setItems } = pizzaSlice.actions;

export default pizzaSlice.reducer;