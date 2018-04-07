import { GET_FAQ_PENDING, GET_FAQ_SUCCESS, GET_FAQ_FAILURE } from '../constants'

import { api, dialog, sentry } from '../lib'

export const getFAQPending = () => {
  return {
    type: GET_FAQ_PENDING
  }
}

export const getFAQSuccess = data => {
  return {
    type: GET_FAQ_SUCCESS,
    data
  }
}

export const getFAQFailure = error => {
  return {
    type: GET_FAQ_FAILURE,
    error
  }
}

export default (id, type) => {
  return async dispatch => {
    dispatch(getFAQPending())

    try {
      const { faq } = await api.request('/faq')

      dispatch(getFAQSuccess(faq))
    } catch (err) {
      dispatch(getFAQFailure(err))

      const { message } = err

      dialog.alert(message)

      sentry.captureException(err)
    }
  }
}
