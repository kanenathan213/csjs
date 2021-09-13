// @flow

import * as actionTypes from './actionTypes'
import type { AlgorithNames } from './constants/algorithmNames'
import type { BaseList } from './types/BaseListItem.js.flow'
import type { StartAction, NextAction, RestartAction, AddAction, ShuffleAction } from './types/Actions.js.flow'

export const createNextAction = (): NextAction => ({
  type: actionTypes.NEXT,
})

export const createAddAction = (): AddAction => ({
  type: actionTypes.ADD_ITEM,
})

export const createRestartAction = (): RestartAction => ({
  type: actionTypes.RESET,
})

export const createShuffleAction = (): ShuffleAction => ({
  type: actionTypes.SHUFFLE,
})

export const createStartAction = (
  algorithmName: AlgorithNames,
  list: BaseList,
  isAutomatic: ?boolean,
): StartAction => ({
  type: actionTypes.START,
  payload: {
    list,
    algorithmName,
    isAutomatic,
  },
})
