// @flow

import type { BaseListItem } from '../../types/BaseListItem.js.flow'
import type { QuickSortGeneratorIOValue } from '../../types/QuickSortGeneratorIOValue.js.flow'

function swap(items, leftIndex, rightIndex) {
  const result = [...items]
  result[leftIndex] = items[rightIndex]
  result[rightIndex] = items[leftIndex]
  return result
}

type NextValue = {
  items: Array<BaseListItem>,
  leftIndex: number,
  rightIndex: number,
  pivotIndex: number,
}

function* partition(itemsArg, leftIndexArg, rightIndexArg): Generator<QuickSortGeneratorIOValue, NextValue, NextValue> {
  const pivotIndex = Math.floor((rightIndexArg + leftIndexArg) / 2)
  const pivotValue = itemsArg[pivotIndex].value
  let i = leftIndexArg
  let j = rightIndexArg
  let items = [...itemsArg]
  yield {
    items,
    leftIndex: i,
    rightIndex: j,
    pivotIndex,
  }

  while (i <= j) {
    while (items[i].value < pivotValue) {
      i += 1
      yield {
        items,
        leftIndex: i,
        rightIndex: j,
        pivotIndex,
      }
    }

    while (items[j].value > pivotValue) {
      j -= 1
      yield {
        items,
        leftIndex: i,
        rightIndex: j,
        pivotIndex,
      }
    }

    if (i <= j) {
      console.log('swapping')
      items = swap(items, i, j)
      yield {
        items,
        leftIndex: i,
        rightIndex: j,
        pivotIndex,
      }

      i += 1
      yield {
        items,
        leftIndex: i,
        rightIndex: j,
        pivotIndex,
      }

      j -= 1
      yield {
        items,
        leftIndex: i,
        rightIndex: j,
        pivotIndex,
      }
    }
    yield {
      items,
      leftIndex: i,
      rightIndex: j,
      pivotIndex,
    }
  }

  return {
    items,
    leftIndex: i,
    rightIndex: j,
    pivotIndex,
  }
}

type QuickSortArgs = {
  items: Array<BaseListItem>,
  leftIndexArg?: number,
  rightIndexArg?: number,
}

function* quickSort(
  args: QuickSortArgs
): Generator<QuickSortGeneratorIOValue, QuickSortGeneratorIOValue, QuickSortGeneratorIOValue> {
  let { items } = args
  const { leftIndexArg, rightIndexArg } = args
  let index
  const leftIndex = typeof leftIndexArg === 'number' ? leftIndexArg : 0
  const rightIndex = typeof rightIndexArg === 'number' ? rightIndexArg : items.length - 1

  if (items.length > 1) {
    ;({ items, leftIndex: index } = yield* partition(items, leftIndex, rightIndex))

    if (leftIndex < index - 1) {
      console.log('sorting left section')
      yield* quickSort({
        items,
        leftIndexArg: leftIndex,
        rightIndexArg: index - 1,
      })
    }

    if (index < rightIndex) {
      console.log('sorting right section')
      yield* quickSort({ items, leftIndexArg: index, rightIndexArg })
    }
  }

  return {
    items,
    leftIndex,
    rightIndex,
    pivotIndex: index,
  }
}

export default quickSort
