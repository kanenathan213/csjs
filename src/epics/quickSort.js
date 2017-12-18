// @flow

import { combineEpics } from 'redux-observable'
import Rx from 'rxjs'
import Observable from 'rxjs/Observable'
import type { AppAction } from '../types/Actions.js.flow'
import quickSortGenerator from '../algorithms/asGenerators/quickSort'

// emit value every 1s
const source = Rx.Observable.interval(1000)
const isDone = arg => {
  console.log(arg)
  return false
}
// do not emit until 5 even numbers have been emitted
const doneNotify = source.filter(isDone)

const sortEpic = (action$: Observable<AppAction>): Observable<AppAction> =>
  action$.ofType('START').switchMap(action => {
    const gen = quickSortGenerator({ items: action.payload.list })

    const { isAutomatic } = action.payload
    if (isAutomatic) {
      return source
        .map(() => {
          const result = gen.next()
          return { type: 'QUICKSORT_SORTING_UPDATED', payload: result }
        })
        .takeWhile(({ payload: { done } }) => !done)
    }
    return action$.ofType('NEXT').map(() => {
      const result = gen.next()
      return { type: 'QUICKSORT_SORTING_UPDATED', payload: result }
    })
  })

export default sortEpic
