import { all, /*call,*/ fork, put, takeEvery } from 'redux-saga/effects'
import { LessonsActionTypes } from './types'
import { fetchError, fetchSuccess, fetchRequest } from './actions'
import { tempSagaDatabase } from '../../main'
import { AnyAction } from 'redux';
// import callApi from '../../utils/callApi'

// const API_ENDPOINT = process.env.REACT_APP_API_ENDPOINT || 'https://my.api.com'

function* handleFetch() {
  try {
    // To call async functions, use redux-saga's `call()`.
    // const res = yield call(callApi, 'get', API_ENDPOINT, '/lessons')

    // if (res.error) {
    //   yield put(fetchError(res.error))
    // } else {
    //   yield put(fetchSuccess(res))
    // }

    //moved res instantiation to utils/sagadata
    
    let res = tempSagaDatabase.getData();
    yield(put(fetchSuccess(res)));
  } catch (err) {
    if (err instanceof Error) {
      yield put(fetchError(err.stack!))
    } else {
      yield put(fetchError('An unknown error occured.'))
    }
  }
}

function* handlePost(action: AnyAction) {
    if (action.type == LessonsActionTypes.POST_LESSON) {
        let data = action.payload
        try {

            tempSagaDatabase.addData(data);

            yield put(fetchRequest());
        } catch (err) {
            if (err instanceof Error) {
                console.log("saga error: " + err.stack!);
            }
            else {
                console.log("an unknown error has occured");
            }
        }

    }
}

// This is our watcher function. We use `take*()` functions to watch Redux for a specific action
// type, and run our saga, for example the `handleFetch()` saga above.
function* watchFetchRequest() {
  yield takeEvery(LessonsActionTypes.FETCH_REQUEST, handleFetch)
}

function* watchPostRequest() {
    yield takeEvery(LessonsActionTypes.POST_LESSON, handlePost)
}

// We can also use `fork()` here to split our saga into multiple watchers.
function* lessonsSaga() {
    yield all([
        fork(watchFetchRequest),
        fork(watchPostRequest)
    ])
}

export default lessonsSaga