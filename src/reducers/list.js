// @flow

import shuffle from 'lodash/shuffle'
import * as actionTypes from '../actionTypes'
import type { State } from './root'
import { getRandomNumberBetweenXandY, getUnsortedListByLength } from './utils'
import type { AppAction } from '../types/Actions.js.flow'

const UNSORTED_LIST = getUnsortedListByLength(6)

const getRandomId = () => String(getRandomNumberBetweenXandY(1, 10 ** 10))

const initialBaseList = UNSORTED_LIST.map(item => ({
  value: item,
  id: getRandomId(),
}))

type Item = {
  value: number,
  id: string,
}

export type ListState = {
  +baseList: Array<Item>,
}

export const initialState: ListState = {
  baseList: initialBaseList,
}

export const baseListSelector = (state: State) => state.list.baseList

export default (state: ListState = initialState, action: AppAction): ListState => {
  switch (action.type) {
    case actionTypes.RESET: {
      return initialState
    }
    case actionTypes.SHUFFLE: {
      const newList = shuffle([...state.baseList])
      return {
        ...state,
        baseList: newList,
      }
    }
    case actionTypes.ADD_ITEM: {
      if (state.baseList.length > 30) {
        return state
      }
      const newItem = {
        value: getRandomNumberBetweenXandY(1, state.baseList.length),
        id: getRandomId(),
      }
      const newList = state.baseList.map(item => ({ value: item.value, id: item.id }))
      newList.splice(getRandomNumberBetweenXandY(0, state.baseList.length), 0, newItem)

      return {
        ...state,
        baseList: newList,
      }
    }
    default:
      return state
  }
}
