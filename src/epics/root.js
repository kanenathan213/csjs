// @flow

import { combineEpics } from 'redux-observable'
import quickSortEpic from './quickSort'

const rootEpic = combineEpics(quickSortEpic)

export default rootEpic
