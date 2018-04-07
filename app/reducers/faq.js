import { GET_FAQ_PENDING, GET_FAQ_SUCCESS, GET_FAQ_FAILURE } from '../constants'

const initialState = {
  data: [],
  error: null,
  loading: false
}

export default (state = initialState, { type, data, error }) => {
  switch (type) {
    case GET_FAQ_PENDING:
      return {
        ...state,
        loading: true
      }

    case GET_FAQ_SUCCESS:
      return {
        ...state,
        data,
        loading: false
      }

    case GET_FAQ_FAILURE:
      return {
        ...state,
        error,
        loading: false
      }

    default:
      return state
  }
}
