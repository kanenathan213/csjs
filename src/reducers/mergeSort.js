// @flow

import * as actionTypes from '../actionTypes'
import type { State } from './root'

export type MergeSortState = {
  +errorMessage: ?string,
}

export const initialState: MergeSortState = {
  errorMessage: null,
}

export const errorMessageSelector = (state: State) => state.meta.errorMessage

export default (state: MergeSortState = initialState, action: Object): MergeSortState => {
  switch (action.type) {
    case actionTypes.USER_CREATE_FORM_FAILED: {
      const message = action.payload && action.payload.message
      return {
        ...state,
        errorMessage: message,
      }
    }
    case actionTypes.SET_INSTITUTION_ERROR: {
      return {
        ...state,
        errorMessage: 'Required to continue',
      }
    }
    case actionTypes.PREQUAL_START_FAILED: {
      const { message, status } = action.payload
      return {
        ...state,
        errorMessage: status
          ? 'Something went wrong. Please try again or contact us to help'
          : message,
      }
    }
    case actionTypes.PREQUAL_CONSENT_CHANGED:
    case actionTypes.GO_TO_NEXT_STEP:
    case actionTypes.GO_TO_PREVIOUS_STEP:
      return {
        ...state,
        errorMessage: null,
      }
    default:
      return state
  }
}
