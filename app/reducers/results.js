import { SEARCH_PENDING, SEARCH_SUCCESS, SEARCH_FAILURE } from '../constants'

const initialState = {
  data: [],
  error: null,
  loading: false
}

export default (state = initialState, { type, data, error }) => {
  switch (type) {
    case SEARCH_PENDING:
      return {
        ...state,
        loading: true
      }

    case SEARCH_SUCCESS:
      return {
        ...state,
        data,
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
