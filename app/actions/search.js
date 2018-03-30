import { SEARCH_PENDING, SEARCH_SUCCESS, SEARCH_FAILURE } from '../constants'

import { api, dialog, sentry } from '../lib'

export const searchPending = () => {
  return {
    type: SEARCH_PENDING
  }
}

export const searchSuccess = data => {
  return {
    type: SEARCH_SUCCESS,
    data
  }
}

export const searchFailure = error => {
  return {
    type: SEARCH_FAILURE,
    error
  }
}

export default query => {
  return async dispatch => {
    dispatch(searchPending())

    try {
      const results = await api.request(`/search?query=${query}`)

      dispatch(searchSuccess(results))
    } catch (err) {
      dispatch(searchFailure(err))

      const { message } = err

      dialog.alert(message)

      sentry.captureException(err)
    }
  }
}
