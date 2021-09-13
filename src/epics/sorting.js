// @flow

import { combineEpics } from 'redux-observable'
import Rx from 'rxjs'
import Observable from 'rxjs/Observable'
import algorithmNames from '../constants/algorithmNames'
import type { AppAction } from '../types/Actions.js.flow'
import quickSortGenerator from '../algorithms/asGenerators/quickSort'
import mergeSort from '../algorithms/asGenerators/mergeSort'
import insertionSort from '../algorithms/asGenerators/insertionSort'

const quickSortEpic = (action$: Observable<AppAction>): Observable<AppAction> =>
  action$
    .ofType('START')
    .filter(({ payload: { algorithmName } }) => algorithmName === algorithmNames.QUICKSORT)
    .switchMap(action => {
      const gen = quickSortGenerator({ items: action.payload.list })

      const { isAutomatic } = action.payload
      if (isAutomatic) {
        return Rx.Observable.interval(1000)
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

const mergeSortEpic = (action$: Observable<AppAction>): Observable<AppAction> =>
  action$
    .ofType('START')
    .filter(({ payload: { algorithmName } }) => algorithmName === algorithmNames.MERGESORT)
    .switchMap(action => {
      const gen = mergeSort([...action.payload.list])
      return action$
        .ofType('NEXT')
        .map(() => {
          const result = gen.next()
          return { type: 'MERGESORT_UPDATED', payload: result }
        })
        .takeWhile(({ payload: { done } }) => !done)
    })

const insertionSortEpic = (action$: Observable<AppAction>): Observable<AppAction> =>
  action$
    .ofType('START')
    .filter(({ payload: { algorithmName } }) => algorithmName === algorithmNames.INSERTIONSORT)
    .switchMap(action => {
      const gen = insertionSort([...action.payload.list])
      return action$
        .ofType('NEXT')
        .map(() => {
          const result = gen.next()
          return { type: 'INSERTIONSORT_UPDATED', payload: result }
        })
        .takeWhile(({ payload: { done } }) => !done)
    })

export default combineEpics(quickSortEpic, mergeSortEpic, insertionSortEpic)
