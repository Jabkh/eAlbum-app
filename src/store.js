import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice'; 
import albumReducer from './slices/albumsSlice'; 

const store = configureStore({
  reducer: {
    auth: authReducer, 
    albums: albumReducer
  }
});

export default store;
