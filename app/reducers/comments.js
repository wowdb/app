import {
  GET_COMMENTS_PENDING,
  GET_COMMENTS_SUCCESS,
  GET_COMMENTS_FAILURE
} from '../constants'

const initialState = {
  data: [],
  error: null,
  loading: false
}

export default (state = initialState, { type, data, error }) => {
  switch (type) {
    case GET_COMMENTS_PENDING:
      return {
        ...state,
        loading: true
      }

    case GET_COMMENTS_SUCCESS:
      return {
        ...state,
        data,
        loading: false
      }

    case GET_COMMENTS_FAILURE:
      return {
        ...state,
        error,
        loading: false
      }

    default:
      return state
  }
}
