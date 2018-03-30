import {
  GET_COMMENTS_PENDING,
  GET_COMMENTS_SUCCESS,
  GET_COMMENTS_FAILURE
} from '../constants'

import { api, dialog, sentry } from '../lib'

export const getCommentsPending = () => {
  return {
    type: GET_COMMENTS_PENDING
  }
}

export const getCommentsSuccess = data => {
  return {
    type: GET_COMMENTS_SUCCESS,
    data
  }
}

export const getCommentsFailure = error => {
  return {
    type: GET_COMMENTS_FAILURE,
    error
  }
}

export default (id, type) => {
  return async dispatch => {
    dispatch(getCommentsPending())

    try {
      const { comments } = await api.request(
        `/comments/${type.substr(0, type.length - 1)}/${id}`
      )

      dispatch(getCommentsSuccess(comments))
    } catch (err) {
      dispatch(getCommentsFailure(err))

      const { message } = err

      dialog.alert(message)

      sentry.captureException(err)
    }
  }
}
