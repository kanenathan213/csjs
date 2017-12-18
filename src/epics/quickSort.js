// @flow

import Observable from 'rxjs/Observable'
// import type Observable from 'rxjs/Observable'
import type { AppAction } from '../types/Actions.js.flow'
import quickSortGenerator from '../algorithms/asGenerators/quickSort'

const sortEpic = (action$: Observable<AppAction>): Observable<AppAction> =>
  action$.ofType('START').switchMap(action => {
    const gen = quickSortGenerator({ items: action.payload.list })
    return action$.ofType('NEXT').map(() => {
      // console.log(action)
      const result = gen.next()
      return { type: 'QUICKSORT_SORTING_UPDATED', payload: result }
    })
  })

export default sortEpic
