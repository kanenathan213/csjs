// @flow

import { combineEpics } from 'redux-observable'
import pingEpic from './ping'

const rootEpic = combineEpics(pingEpic)

export default rootEpic

