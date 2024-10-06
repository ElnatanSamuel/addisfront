import { all } from "redux-saga/effects";
import { songSaga } from "./songSaga";
import { statisticsSaga } from "./statisticsSaga";

export default function* rootSaga() {
  yield all([songSaga(), statisticsSaga()]);
}
