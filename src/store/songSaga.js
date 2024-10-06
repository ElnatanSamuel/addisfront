import { call, put, takeLatest } from "redux-saga/effects";
import axios from "axios";
import {
  fetchSongsStart,
  fetchSongsSuccess,
  fetchSongsFailure,
  addSongStart,
  addSongSuccess,
  addSongFailure,
  deleteSongStart,
  deleteSongSuccess,
  deleteSongFailure,
} from "./songSlice";
import { fetchStatsStart } from "./statisticsSlice";

const API_BASE_URL = "https://songserver.vercel.app";

function* fetchSongs() {
  try {
    const response = yield call(axios.get, `${API_BASE_URL}/api/songs`);
    yield put(fetchSongsSuccess(response.data));
  } catch (error) {
    yield put(fetchSongsFailure(error.message));
  }
}

function* addSong(action) {
  try {
    const response = yield call(
      axios.post,
      `${API_BASE_URL}/api/songs`,
      action.payload
    );
    yield put(addSongSuccess(response.data));
    yield put(fetchStatsStart()); // Fetch updated stats
  } catch (error) {
    yield put(addSongFailure(error.message));
  }
}

function* deleteSong(action) {
  try {
    yield call(axios.delete, `${API_BASE_URL}/api/songs/${action.payload}`);
    yield put(deleteSongSuccess(action.payload));
    yield put(fetchStatsStart()); // Fetch updated stats
  } catch (error) {
    yield put(deleteSongFailure(error.message));
  }
}

export function* songSaga() {
  yield takeLatest(fetchSongsStart.type, fetchSongs);
  yield takeLatest(addSongStart.type, addSong);
  yield takeLatest(deleteSongStart.type, deleteSong);
}
