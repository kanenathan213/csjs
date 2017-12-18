// @flow

import type { BaseListItem } from '../../types/BaseListItem.js.flow'

// Takes two sorted list and combines them into one sorted list
function* merge(
  left: Array<BaseListItem>,
  right: Array<BaseListItem>
): Generator<Array<BaseListItem>, Array<BaseListItem>, Object> {
  const result = []
  let il = 0
  let ir = 0

  while (il < left.length && ir < right.length) {
    if (left[il].value < right[ir].value) {
      result.push(left[il])
      il += 1
    } else {
      result.push(right[ir])
      ir += 1
    }
  }
  const output = [...result, ...left.slice(il), ...right.slice(ir)]
  yield output
  return output
}

function* mergeSort(items: Array<BaseListItem>): Generator<Object, Array<BaseListItem>, Object> {
  // Terminal case: 0 or 1 item arrays don't need sorting
  if (items.length < 2) {
    return items
  }

  const middle = Math.floor(items.length / 2)
  const left = items.slice(0, middle)
  const right = items.slice(middle)

  const sortedLeft = yield* mergeSort(left)
  const sortedRight = yield* mergeSort(right)

  const result = yield* merge(sortedLeft, sortedRight)
  yield result
  return result
}

export default mergeSort
