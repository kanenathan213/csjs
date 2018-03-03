// @flow

import type { BaseList } from '../../types/BaseListItem.js.flow'

function* insertionSort(itemsArg: BaseList): Generator<*, *, *> {
  const len = itemsArg.length // number of items in the array
  let current // the value currently being compared
  let i // index into unsorted section
  let j // index into sorted section

  const items = [...itemsArg]

  for (i = 0; i < len; i += 1) {
    // store the current value because it may shift later
    current = {
      ...items[i],
    }

    /*
         * Whenever the value in the sorted section is greater than the value
         * in the unsorted section, shift all items in the sorted section over
         * by one. This creates space in which to insert the value.
         */
    for (j = i - 1; j > -1 && items[j].value > current.value; j -= 1) {
      items[j + 1] = items[j]
    }

    items[j + 1] = current
    yield items
  }

  return items
}

export default insertionSort
