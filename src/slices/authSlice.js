import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { SIGN_IN_URL, SIGN_UP_URL } from "../config/firebaseConfig";

// fonction asynchrone pour l'authentification
export const authenticateUser = createAsyncThunk(
  'auth/authenticateUser',
  async ({ email, password, authMode }, { rejectWithValue }) => {
    try {
      const URL = authMode === "Se connecter" ? SIGN_IN_URL : SIGN_UP_URL;
      const credentials = {
        email,
        password,
        returnSecureToken: true
      };
      const response = await axios.post(URL, credentials);
      localStorage.setItem("token", response.data.idToken);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const authSlice = createSlice({
    name: "auth",
    initialState: {
        user: null,
        authMode: "Se connecter", // Initialiser authMode à "Se connecter"
        loading: false,
        error: null
    },
    reducers: {
        setAuthMode: (state, action) => {
            state.authMode = action.payload;
        },
        removeUser: (state, action) => {
            state.user = null;
            localStorage.removeItem("token");
        }
    },
    extraReducers: (builder) => {
      builder
        .addCase(authenticateUser.pending, (state, action) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(authenticateUser.fulfilled, (state, action) => {
          state.loading = false;
          state.user = action.payload;
          state.authMode = ""; // Réinitialiser authMode à une chaîne vide après une authentification réussie
        })
        .addCase(authenticateUser.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload;
        });
    }
});

export const { removeUser,setAuthMode } = authSlice.actions;
export default authSlice.reducer;