import { Reducer } from 'redux'
import { LessonsState, LessonsActionTypes } from './types'

// Type-safe initialState!
const initialState: LessonsState = {
  data: [],
  errors: undefined,
  loading: false
}

// Thanks to Redux 4's much simpler typings, we can take away a lot of typings on the reducer side,
// everything will remain type-safe.
const reducer: Reducer<LessonsState> = (state = initialState, action) => {
  switch (action.type) {
    case LessonsActionTypes.FETCH_REQUEST: {
        return { ...state, loading: true }
    }
    case LessonsActionTypes.FETCH_SUCCESS: {
        return { ...state, loading: false, data: action.payload }
    }
    case LessonsActionTypes.FETCH_ERROR: {
        return { ...state, loading: false, errors: action.payload }
    }
    case LessonsActionTypes.POST_LESSON: {
        console.log("posting lesson");

        return {...state}
    }
    default: {
      return state
    }
  }
}

// Instead of using default export, we use named exports. That way we can group these exports
// inside the `index.js` folder.
export { reducer as lessonsReducer }