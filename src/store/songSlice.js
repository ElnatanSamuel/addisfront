import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  songs: [],
  filteredSongs: [],
  loading: false,
  error: null,
  filter: "",
};

const songSlice = createSlice({
  name: "songs",
  initialState,
  reducers: {
    fetchSongsStart(state) {
      state.loading = true;
      state.error = null;
    },
    fetchSongsSuccess(state, action) {
      state.songs = action.payload;
      state.filteredSongs = action.payload;
      state.loading = false;
    },
    fetchSongsFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    addSongStart(state) {
      state.loading = true;
      state.error = null;
    },
    addSongSuccess(state, action) {
      state.songs.push(action.payload);
      state.filteredSongs.push(action.payload);
      state.loading = false;
    },
    addSongFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    updateSongStart(state) {
      state.loading = true;
      state.error = null;
    },
    updateSongSuccess(state, action) {
      const index = state.songs.findIndex(
        (song) => song._id === action.payload._id
      );
      if (index !== -1) {
        state.songs[index] = action.payload;
        state.filteredSongs = state.songs.filter((song) =>
          song.genre.toLowerCase().includes(state.filter.toLowerCase())
        );
      }
      state.loading = false;
    },
    updateSongFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    deleteSongStart(state) {
      state.loading = true;
      state.error = null;
    },
    deleteSongSuccess(state, action) {
      state.songs = state.songs.filter((song) => song._id !== action.payload);
      state.filteredSongs = state.filteredSongs.filter(
        (song) => song._id !== action.payload
      );
      state.loading = false;
    },
    deleteSongFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    setFilter(state, action) {
      state.filter = action.payload;
      state.filteredSongs = state.songs.filter((song) =>
        song.genre.toLowerCase().includes(action.payload.toLowerCase())
      );
    },
  },
});

export const {
  fetchSongsStart,
  fetchSongsSuccess,
  fetchSongsFailure,
  addSongStart,
  addSongSuccess,
  addSongFailure,
  updateSongStart,
  updateSongSuccess,
  updateSongFailure,
  deleteSongStart,
  deleteSongSuccess,
  deleteSongFailure,
  setFilter,
} = songSlice.actions;

export default songSlice.reducer;
