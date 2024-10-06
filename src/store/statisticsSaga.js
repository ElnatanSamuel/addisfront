import { call, put, takeLatest } from "redux-saga/effects";
import axios from "axios";
import {
  fetchStatsStart,
  fetchStatsSuccess,
  fetchStatsFailure,
} from "./statisticsSlice";

const API_BASE_URL = "https://songserver.vercel.app";

function* fetchStats() {
  try {
    console.log("Fetching stats...");
    const response = yield call(axios.get, `${API_BASE_URL}/api/songs/stats`);
    console.log("Stats fetched:", response.data);
    yield put(fetchStatsSuccess(response.data));
  } catch (error) {
    console.error("Error fetching stats:", error);
    yield put(fetchStatsFailure(error.message));
  }
}

export function* statisticsSaga() {
  yield takeLatest(fetchStatsStart.type, fetchStats);
}
