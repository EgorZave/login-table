import { createSlice, createAsyncThunk, } from '@reduxjs/toolkit';

type TableItem = {
  id: number;
  name: string;
  email: string;
  birthday_date: string;
  phone_number: string;
  address: string;
};

type Data = {
  count: number | null;
  next: string | null;
  previous: string | null;
  results: TableItem[]
}

type TableState = {
  data: {
    count: number | null;
    next: string | null;
    previous: string | null;
    results: TableItem[];
  };
  isLoading: boolean;
  error: unknown;
};

const initialState: TableState = {
  data: {
    count: null,
    next: null,
    previous: null,
    results: [],
  },
  isLoading: false,
  error: null, 
};

export const fetchData = createAsyncThunk<Data, string>(
  'table/fetchData',
  async (url, { rejectWithValue }) => {
    try {
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error("Server Error!");
      }

      const data = await response.json();
      return data;
    } catch (error) {
      return console.log("Server Error");
    }
  }
);

const tableSlice = createSlice({
  name: 'table',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchData.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchData.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload;
        state.error = null;
      })
      .addCase(fetchData.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});



export default tableSlice.reducer;
