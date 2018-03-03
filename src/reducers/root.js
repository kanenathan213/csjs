// @flow

import { combineReducers } from 'redux'
import quickSortReducer from './quickSort'
import insertionSortReducer from './insertionSort'
import listReducer from './list'
import type { ListState } from './list'
import type { QuickSortState } from './quickSort'
import type { MergeSortState } from './mergeSort'
import type { InsertionSortState } from './insertionSort'
import mergeSortReducer from './mergeSort'

const makeRootReducer = () =>
  combineReducers({
    quickSort: quickSortReducer,
    mergeSort: mergeSortReducer,
    insertionSort: insertionSortReducer,
    list: listReducer,
  })

export type State = {
  +quickSort: QuickSortState,
  +mergeSort: MergeSortState,
  +insertionSort: InsertionSortState,
  +list: ListState,
}

export default makeRootReducer
