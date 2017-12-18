// @flow

import { combineReducers } from 'redux'
import quickSortReducer from './quickSort'
import listReducer from './list'
import type { ListState } from './list'
import type { QuickSortState } from './quickSort'
import type { MergeSortState } from './mergeSort'
import mergeSortReducer from './mergeSort'

const makeRootReducer = () =>
  combineReducers({
    quickSort: quickSortReducer,
    mergeSort: mergeSortReducer,
    list: listReducer,
  })

export type State = {
  +quickSort: QuickSortState,
  +mergeSort: MergeSortState,
  +list: ListState,
}

export default makeRootReducer
