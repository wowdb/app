import {
  GET_OBJECT_PENDING,
  GET_OBJECT_SUCCESS,
  GET_OBJECT_FAILURE
} from '../actions/get-object'

const initial = {
  objects: {},
  error: null,
  loading: false
}

export default (state = initial, { type, objects, error }) => {
  switch (type) {
    case GET_OBJECT_PENDING:
      return {
        ...state,
        error: null,
        loading: true
      }

    case GET_OBJECT_SUCCESS:
      return {
        ...state,
        objects,
        loading: false
      }

    case GET_OBJECT_FAILURE:
      return {
        ...state,
        error,
        loading: false
      }

    default:
      return state
  }
}
