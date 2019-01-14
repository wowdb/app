import {
  SEARCH_PENDING,
  SEARCH_SUCCESS,
  SEARCH_FAILURE
} from '../actions/search'

const initial = {
  results: [],
  error: null,
  loading: false
}

export default (state = initial, { type, results, error }) => {
  switch (type) {
    case SEARCH_PENDING:
      return {
        ...state,
        error: null,
        loading: true
      }

    case SEARCH_SUCCESS:
      return {
        ...state,
        results,
        loading: false
      }

    case SEARCH_FAILURE:
      return {
        ...state,
        error,
        loading: false
      }

    default:
      return state
  }
}
