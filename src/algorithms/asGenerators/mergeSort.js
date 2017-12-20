// @flow

import type { MergeSortGenIO } from '../../types/MergeSortGenIO.js.flow'
import type { BaseList } from '../../types/BaseListItem.js.flow'

// Takes two sorted list and combines them into one sorted list
function* merge(left: BaseList, right: BaseList): Generator<MergeSortGenIO, BaseList, void> {
  const result = []
  let il = 0
  let ir = 0

  yield {
    left,
    right,
    merged: [],
    status: 'Starting merge iteration',
  }

  while (il < left.length && ir < right.length) {
    if (left[il].value < right[ir].value) {
      result.push(left[il])
      yield {
        left,
        right,
        merged: [...result],
        isMerging: true,
        status: 'One left-side item merged',
      }
      il += 1
    } else {
      result.push(right[ir])
      yield {
        left,
        right,
        merged: [...result],
        isMerging: true,
        status: 'One right-side item merged',
      }
      ir += 1
    }
  }
  const output = [...result, ...left.slice(il), ...right.slice(ir)]
  yield {
    left,
    right,
    merged: [...output],
    isMerging: true,
    status: 'Final merging just occurred',
  }
  return output
}

function* mergeSort(items: BaseList): Generator<MergeSortGenIO, BaseList, void> {
  // Terminal case: 0 or 1 item arrays don't need sorting
  if (items.length < 2) {
    // yield items
    return items
  }

  const middle = Math.floor(items.length / 2)
  const left = items.slice(0, middle)
  const right = items.slice(middle)

  yield {
    left,
    right,
    merged: [],
    status: 'Dividing up segment',
  }

  const sortedLeft = yield* mergeSort(left)
  const sortedRight = yield* mergeSort(right)

  const result = yield* merge(sortedLeft, sortedRight)
  yield {
    left: sortedLeft,
    right: sortedRight,
    merged: result,
    isMerged: true,
    status: 'Merged occurred',
  }
  return result
}

export default mergeSort
