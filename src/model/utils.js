export const getRandomNumberBetweenXandY = (x, y) => Math.floor(Math.random() * y) + x

export const getUnsortedListByLength = (len) => {
  const res = []
  while (res.length - 1 < len) {
    res.push(getRandomNumberBetweenXandY(1, Math.max(len + 1, 10)))
  }
  return res
}
