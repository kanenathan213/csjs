function swap(items, leftIndex, rightIndex) {
  var temp = items[leftIndex]
  items[leftIndex] = items[rightIndex]
  items[rightIndex] = temp
}

function* partition(items, leftIndex, rightIndex) {
  const pivotIndex = Math.floor((rightIndex + leftIndex) / 2)
  const pivotValue = items[pivotIndex].value
  let i = leftIndex
  let j = rightIndex

  yield {
    items,
    leftIndex: i,
    rightIndex: j,
    pivotIndex,
  }

  while (i <= j) {
    while (items[i].value < pivotValue) {
      i++
      yield {
        items,
        leftIndex: i,
        rightIndex: j,
        pivotIndex,
      }
    }

    while (items[j].value > pivotValue) {
      j--
      yield {
        items,
        leftIndex: i,
        rightIndex: j,
        pivotIndex,
      }
    }

    if (i <= j) {
      swap(items, i, j)
      yield {
        items,
        leftIndex: i,
        rightIndex: j,
        pivotIndex,
      }
      i++
      yield {
        items,
        leftIndex: i,
        rightIndex: j,
        pivotIndex,
      }
      j--
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

  return i
}

function* quickSort(args) {
  const { items, leftIndexArg, rightIndexArg } = args
  let index
  const leftIndex = typeof leftIndexArg === 'number' ? leftIndexArg : 0
  const rightIndex =
    typeof rightIndexArg === 'number' ? rightIndexArg : items.length - 1

  if (items.length > 1) {
    index = yield* partition(items, leftIndex, rightIndex)

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

  return { items, leftIndex, rightIndex, pivotIndex: index }
}

export default quickSort
