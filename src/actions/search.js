import { api, dialog } from '../lib'

export const SEARCH_PENDING = 'SEARCH_PENDING'
export const SEARCH_SUCCESS = 'SEARCH_SUCCESS'
export const SEARCH_FAILURE = 'SEARCH_FAILURE'

export const searchPending = () => {
  return {
    type: SEARCH_PENDING
  }
}

export const searchSuccess = results => {
  return {
    results,
    type: SEARCH_SUCCESS
  }
}

export const searchFailure = error => {
  return {
    error,
    type: SEARCH_FAILURE
  }
}

export default query => {
  return async dispatch => {
    dispatch(searchPending())

    try {
      const { results } = await api.request(
        `/search?query=${encodeURIComponent(query)}`
      )

      dispatch(searchSuccess(results))
    } catch (error) {
      dispatch(searchFailure(error))

      const { message } = error

      dialog.alert(message)
    }
  }
}
