// @flow

import * as actionTypes from './actionTypes'
import type { AlgorithNames } from './constants/algorithmNames'
import type { BaseList } from './types/BaseListItem.js.flow'
import type { StartAction } from './types/Actions.js.flow'

export const createNextAction = () => ({
  type: actionTypes.NEXT,
})

export const createShuffleAction = () => ({
  type: actionTypes.SHUFFLE,
})

export const createStartAction = (algorithmName: AlgorithNames, list: BaseList): StartAction => ({
  type: actionTypes.START,
  payload: {
    list,
    algorithmName,
  },
})
