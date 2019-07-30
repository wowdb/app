import {
  GET_META_FAILURE,
  GET_META_PENDING,
  GET_META_SUCCESS
} from '../actions/get-meta'
import Data from '../data'

const initial = {
  meta: {},
  error: null,
  loading: false
}

export default (state = initial, { type, meta, error }) => {
  switch (type) {
    case GET_META_PENDING:
      return {
        ...state,
        error: null,
        loading: true
      }

    case GET_META_SUCCESS:
      Data.set(meta)

      return {
        ...state,
        meta,
        loading: false
      }

    case GET_META_FAILURE:
      return {
        ...state,
        error,
        loading: false
      }

    default:
      return state
  }
}
