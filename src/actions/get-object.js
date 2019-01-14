import update from 'immutability-helper'
import pluralize from 'pluralize'

import { api, dialog } from '../lib'

export const GET_OBJECT_PENDING = 'GET_OBJECT_PENDING'
export const GET_OBJECT_SUCCESS = 'GET_OBJECT_SUCCESS'
export const GET_OBJECT_FAILURE = 'GET_OBJECT_FAILURE'

export const getObjectPending = () => {
  return {
    type: GET_OBJECT_PENDING
  }
}

export const getObjectSuccess = objects => {
  return {
    objects,
    type: GET_OBJECT_SUCCESS
  }
}

export const getObjectFailure = error => {
  return {
    error,
    type: GET_OBJECT_FAILURE
  }
}

export default (type, id) => async (dispatch, getState) => {
  dispatch(getObjectPending())

  try {
    const {
      objects: { objects }
    } = getState()

    const response = await api.request(`/${pluralize(type)}/${id}`)

    const data = update(objects, {
      [`${type}.${id}`]: {
        $set: response
      }
    })

    dispatch(getObjectSuccess(data))
  } catch (error) {
    dispatch(getObjectFailure(error))

    const { message } = error

    dialog.alert(message)
  }
}
