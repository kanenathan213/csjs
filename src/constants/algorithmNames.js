// @flow

const algorithmNames = {
  QUICKSORT: 'QUICKSORT',
  MERGESORT: 'MERGESORT',
  INSERTIONSORT: 'INSERTIONSORT',
}

export type AlgorithNames = $Keys<typeof algorithmNames>

export default algorithmNames
