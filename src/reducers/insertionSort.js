// @flow

import * as actionTypes from '../actionTypes'
import type { State } from './root'
import algorithmNames from '../constants/algorithmNames'
import type { AppAction } from '../types/Actions.js.flow'
import type { DisplayableMergeSortItem } from '../types/DisplayableMergeSortItem.js.flow'

export type InsertionSortState = {
  +currentList: Array<DisplayableMergeSortItem>,
  +done: boolean,
  +inProgress: boolean,
}

export const initialState: InsertionSortState = {
  currentList: [],
  done: false,
  inProgress: false,
}

export const currentListSelector = (state: State) => state.insertionSort.currentList
export const inProgressSelector = (state: State) => state.insertionSort.inProgress

// const transformBaseToDisplay = (
//   baseList: BaseList | Array<DisplayableMergeSortItem>,
//   action?: MergeSortUpdatedAction,
//   mergingList?: BaseList
// ): Array<DisplayableMergeSortItem> =>
//   baseList.map(item => ({
//     isInLeft: action ? action.payload.value.left.some(leftItem => leftItem.id === item.id) : false,
//     isInRight: action ? action.payload.value.right.some(rightItem => rightItem.id === item.id) : false,
//     value: item.value,
//     id: item.id,
//     isBeingMerged: mergingList ? mergingList.some(mergingItem => mergingItem.id === item.id) : false,
//   }))

export default (state: InsertionSortState = initialState, action: AppAction): InsertionSortState => {
  switch (action.type) {
    case actionTypes.RESET: {
      return initialState
    }
    case actionTypes.START: {
      const { algorithmName } = action.payload
      if (algorithmName !== algorithmNames.INSERTIONSORT) return state

      return {
        ...state,
        currentList: action.payload.list,
        inProgress: true,
      }
    }
    case actionTypes.NEXT: {
      return {
        ...state,
        nextOccurred: true,
        done: state.nextOccurred,
      }
    }
    case actionTypes.INSERTIONSORT_UPDATED: {
      const { value } = action.payload

      return {
        ...state,
        currentList: [...value],
      }
    }
    default:
      return state
  }
}
