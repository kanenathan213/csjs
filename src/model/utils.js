// @flow

export const getRandomNumberBetweenXandY = (x: number, y: number): number =>
  Math.floor(Math.random() * y) + x

export const getUnsortedListByLength = (len: number): Array<number> => {
  const res = []
  while (res.length - 1 < len) {
    res.push(getRandomNumberBetweenXandY(1, Math.max(len + 1, 10)))
  }
  return res
}
