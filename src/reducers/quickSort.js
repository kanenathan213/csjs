// @flow

import * as actionTypes from '../actionTypes'
import type { State } from './root'
import algorithmNames from '../constants/algorithmNames'
import type { BaseListItem } from '../types/BaseListItem.js.flow'

export type QuickSortState = {
  +inProgress: boolean,
  +leftIndex: ?number,
  +rightIndex: ?number,
  +pivotIndex: ?number,
  +done: boolean,
  +currentSortingList: Array<BaseListItem>,
}

export const initialState: QuickSortState = {
  inProgress: false,
  done: false,
  leftIndex: null,
  rightIndex: null,
  pivotIndex: null,
  currentSortingList: [],
}

export const indicesSelector = (state: State) => ({
  leftIndex: state.quickSort.leftIndex,
  rightIndex: state.quickSort.rightIndex,
  pivotIndex: state.quickSort.pivotIndex,
})
export const isInProgressSelector = (state: State) => state.quickSort.inProgress
export const isDoneSelector = (state: State) => state.quickSort.done
export const currentSortingListSelector = (state: State) => state.quickSort.currentSortingList

export default (state: QuickSortState = initialState, action: Object): QuickSortState => {
  switch (action.type) {
    case actionTypes.RESET: {
      return initialState
    }
    case actionTypes.START: {
      const { algorithmName } = action.payload
      if (algorithmName !== algorithmNames.QUICKSORT) return state

      return {
        ...state,
        inProgress: true,
      }
    }
    case actionTypes.QUICKSORT_SORTING_UPDATED: {
      const { value, done } = action.payload
      const { leftIndex, rightIndex, pivotIndex, items } = value
      return {
        ...state,
        done,
        leftIndex,
        rightIndex,
        pivotIndex,
        currentSortingList: items,
        inProgress: !done,
      }
    }
    default:
      return state
  }
}
