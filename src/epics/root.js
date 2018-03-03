// @flow

import { combineEpics } from 'redux-observable'
import sorting from './sorting'

const rootEpic = combineEpics(sorting)

export default rootEpic
