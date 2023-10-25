import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';


type LoginState = {
   isLoading: boolean;
   data: {
      message: string
   };
   error: unknown
}

const initialState: LoginState = {
  isLoading: false,
  data: { message: '' },
  error: null,
};


export const login = createAsyncThunk(
   'login/login', async (loginData, { rejectWithValue }) => {
  try {
    const response = await fetch("https://technical-task-api.icapgroupgmbh.com/api/login/", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(loginData),
    });

    if (!response.ok) {
      throw new Error("Invalid Credentials");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    return rejectWithValue("Invalid Credentials");
  }
});

const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload;
        state.error = null;
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export default loginSlice.reducer;
