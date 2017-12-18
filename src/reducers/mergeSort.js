// @flow

import * as actionTypes from '../actionTypes'
import type { State } from './root'
import algorithmNames from '../constants/algorithmNames'
import type { BaseListItem } from '../types/BaseListItem.js.flow'
import type { AppAction } from '../types/Actions.js.flow'

export type MergeSortState = {
  +currentSortingList: Array<BaseListItem>,
  +sortedList: Array<BaseListItem>,
  +inProgress: boolean,
}

export const initialState: MergeSortState = {
  currentSortingList: [],
  sortedList: [],
  inProgress: false,
}

// export const indicesSelector = (state: State) => ({
//   leftIndex: state.quickSort.leftIndex,
//   rightIndex: state.quickSort.rightIndex,
//   pivotIndex: state.quickSort.pivotIndex,
// })
export const isInProgressSelector = (state: State) => state.mergeSort.inProgress
// export const isDoneSelector = (state: State) => state.mergeSort.done
export const currentSortingListSelector = (state: State) => state.mergeSort.currentSortingList
export const sortedListSelector = (state: State) => state.mergeSort.sortedList

export default (state: MergeSortState = initialState, action: AppAction): MergeSortState => {
  switch (action.type) {
    case actionTypes.RESET: {
      return initialState
    }
    case actionTypes.START: {
      const { algorithmName } = action.payload
      if (algorithmName !== algorithmNames.MERGESORT) return state

      return {
        ...state,
        inProgress: true,
      }
    }
    case 'MERGESORT_UPDATED': {
      return {
        ...state,
        sortedList: action.payload.value,
      }
    }
    default:
      return state
  }
}
