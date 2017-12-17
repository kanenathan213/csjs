// @flow

import * as actionTypes from '../actionTypes'
import type { State } from './root'
import algorithmNames from '../constants/algorithmNames'
import quickSort from '../algorithms/asGenerators/quickSort'
import type { QuickSortOutputValue } from '../types/QuickSortOutput.js.flow'

export type QuickSortState = {
  +generator: ?Generator<QuickSortOutputValue, QuickSortOutputValue, void>,
  +inProgress: boolean,
  +leftIndex: ?number,
  +rightIndex: ?number,
  +pivotIndex: ?number,
  +done: boolean,
}

export const initialState: QuickSortState = {
  generator: null,
  inProgress: false,
  done: false,
  leftIndex: null,
  rightIndex: null,
  pivotIndex: null,
}

export const generatorSelector = (state: State) => state.quickSort.generator
export const indicesSelector = (state: State) => ({
  leftIndex: state.quickSort.leftIndex,
  rightIndex: state.quickSort.rightIndex,
  pivotIndex: state.quickSort.pivotIndex,
})
export const isInProgressSelector = (state: State) => state.quickSort.inProgress
export const isDoneSelector = (state: State) => state.quickSort.done

export default (state: QuickSortState = initialState, action: Object): QuickSortState => {
  switch (action.type) {
    case actionTypes.RESET: {
      return initialState
    }
    case actionTypes.START: {
      const { list, algorithmName } = action.payload
      if (algorithmName !== algorithmNames.QUICKSORT) return state

      return {
        ...state,
        generator: quickSort({ items: list }),
        inProgress: true,
      }
    }
    case actionTypes.NEXT: {
      if (!state.generator) return state
      const { value, done } = state.generator.next()
      if (!value) {
        return state
      }
      const { leftIndex, rightIndex, pivotIndex } = value
      return {
        ...state,
        done,
        leftIndex,
        rightIndex,
        pivotIndex,
        inProgress: !done,
      }
    }
    default:
      return state
  }
}
