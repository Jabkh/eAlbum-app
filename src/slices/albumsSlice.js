import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { BASE_DB_URL } from "../config/firebaseConfig";
import axios from "axios";

export const fetchAlbums = createAsyncThunk("albums/fetchAlbums", async () => {
  try {
    const response = await axios.get(`${BASE_DB_URL}/albums.json`);
    const albums = [];

    for (const key in response.data) {
      albums.push({ id: key, ...response.data[key] });
    }

    return albums;
  } catch (error) {
    console.error("Error fetching albums:", error);
    throw error;
  }
});

export const postAlbum = createAsyncThunk("albums/postAlbum", async (newAlbum) => {
  try {
    const token = localStorage.getItem("token");
    if (!token) {
      throw new Error("No token found");
    }
    const response = await axios.post(`${BASE_DB_URL}/albums.json?auth=${token}`, newAlbum);
    const data = await response.data;

    return {
      id: data.name,
      ...newAlbum,
    };
  } catch (error) {
    console.error("Error posting album:", error);
    throw error; 
  }
});

export const updateAlbum = createAsyncThunk("albums/updateAlbum", async (updatedAlbum) => {
  try {
    const token = localStorage.getItem("token");
    if (!token) {
      throw new Error("No token found");
    }
    await axios.put(`${BASE_DB_URL}/albums/${updatedAlbum.id}.json?auth=${token}`, updatedAlbum);
    return updatedAlbum;
  } catch (error) {
    console.error("Error updating album:", error);
    throw error;
  }
});

export const deleteAlbum = createAsyncThunk("albums/deleteAlbum", async (albumId) => {
  try {
    const token = localStorage.getItem("token");
    if (!token) {
      throw new Error("No token found");
    }
    await axios.delete(`${BASE_DB_URL}/albums/${albumId}.json?auth=${token}`);
    return albumId;
  } catch (error) {
    console.error("Error deleting album:", error);
    throw error;
  }
});


const albumsSlice = createSlice({
  name: "albums",
  initialState: {
    albums: [],
    isLoading: false,
    hasChanged: false
  },
  reducers: {
    resetChangeFlag :(state,action) =>{
    state.hasChanged = !state.hasChanged
}},
  extraReducers: (builder) => {
    builder.addCase(fetchAlbums.fulfilled, (state, action) => {
      state.albums = action.payload;
    });
    builder.addCase(postAlbum.fulfilled, (state, action) => {
      state.albums.push(action.payload);
    });
    builder.addCase(updateAlbum.fulfilled, (state, action) => {
      const index = state.albums.findIndex((album) => album.id === action.payload.id);
      if (index !== -1) {
        state.albums[index] = action.payload;
      }
    });
    builder.addCase(deleteAlbum.fulfilled, (state, action) => {
      state.albums = state.albums.filter((album) => album.id !== action.payload);
    });
    builder.addCase(fetchAlbums.pending, (state, action) => {
      state.isLoading = true;
    });
  },
});

export const { resetChangeFlag } = albumsSlice.actions;
export default albumsSlice.reducer;
