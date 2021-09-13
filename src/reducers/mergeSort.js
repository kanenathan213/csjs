// @flow

import * as actionTypes from '../actionTypes'
import type { State } from './root'
import algorithmNames from '../constants/algorithmNames'
import type { BaseList } from '../types/BaseListItem.js.flow'
import type { MergeSortUpdatedAction, AppAction } from '../types/Actions.js.flow'
import type { DisplayableMergeSortItem } from '../types/DisplayableMergeSortItem.js.flow'

export type MergeSortState = {
  +inProgress: boolean,
  +nextOccurred: boolean,
  +done: boolean,
  +left: BaseList,
  +right: BaseList,
  +mergingList: BaseList,
  +isMerged: BaseList,
  +topList: Array<DisplayableMergeSortItem>,
}

export const initialState: MergeSortState = {
  left: [],
  right: [],
  inProgress: false,
  mergingList: [],
  isMerged: [],
  topList: [],
  nextOccurred: false,
  done: false,
}

export const isInProgressSelector = (state: State) => state.mergeSort.inProgress
export const mergingListSelector = (state: State) => state.mergeSort.mergingList
export const isMergedSelector = (state: State) => state.mergeSort.isMerged
export const leftSelector = (state: State) => state.mergeSort.left
export const rightSelector = (state: State) => state.mergeSort.right
export const topListSelector = (state: State) => state.mergeSort.topList
export const mergeSortDoneSelector = (state: State) => state.mergeSort.done

const transformBaseToDisplay = (
  baseList: BaseList | Array<DisplayableMergeSortItem>,
  action?: MergeSortUpdatedAction,
  mergingList?: BaseList,
): Array<DisplayableMergeSortItem> =>
  baseList.map(item => ({
    isInLeft: action ? action.payload.value.left.some(leftItem => leftItem.id === item.id) : false,
    isInRight: action ? action.payload.value.right.some(rightItem => rightItem.id === item.id) : false,
    value: item.value,
    id: item.id,
    isBeingMerged: mergingList ? mergingList.some(mergingItem => mergingItem.id === item.id) : false,
  }))

const getNextTopList = (
  state: MergeSortState,
  action: MergeSortUpdatedAction,
  mergingList: BaseList,
): Array<DisplayableMergeSortItem> => {
  if (action.payload.value.isMerged) {
    const indexToReinsert = state.topList.findIndex(item => item.isBeingMerged)
    if (indexToReinsert === -1) return transformBaseToDisplay(state.topList, action, mergingList)
    return [
      ...state.topList.slice(0, indexToReinsert),
      ...transformBaseToDisplay(action.payload.value.merged, action, mergingList),
      ...state.topList.slice(indexToReinsert + action.payload.value.merged.length),
    ]
  }

  return transformBaseToDisplay(state.topList, action, mergingList)
}

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
        topList: transformBaseToDisplay(action.payload.list),
      }
    }
    case actionTypes.NEXT: {
      return {
        ...state,
        nextOccurred: true,
        done: state.nextOccurred,
      }
    }
    case actionTypes.MERGESORT_UPDATED: {
      let mergingList = []
      let isMerged = []
      if (action.payload.value.isMerging) {
        mergingList = [...action.payload.value.merged]
      }
      if (action.payload.value.isMerged) {
        isMerged = [...state.isMerged, ...action.payload.value.merged]
      }
      const nextTopList = getNextTopList(state, action, mergingList)
      return {
        ...state,
        left: action.payload.value.left,
        right: action.payload.value.right,
        mergingList,
        isMerged,
        topList: nextTopList,
        nextOccurred: false,
      }
    }
    default:
      return state
  }
}
