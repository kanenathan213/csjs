import { observable, action, computed } from 'mobx'
import shuffle from 'lodash/shuffle'
import sortBy from 'lodash/sortBy'
import { getRandomNumberBetweenXandY, getUnsortedListByLength } from './utils'
import quickSort from '../quicksort'

const UNSORTED_LIST = getUnsortedListByLength(6)

const getRandomId = () => String(getRandomNumberBetweenXandY(1, 10 ** 10))

const initialBaseList = UNSORTED_LIST.map(item => ({
  value: item,
  id: getRandomId(),
}))

class ListStore {
  @observable baseList = initialBaseList
  @observable leftIndex = null
  @observable rightIndex = null
  @observable pivotIndex = null
  @observable inProgress = false
  @observable done = false
  @observable quickSortGen = null

  @computed
  get displayableListData() {
    const result = this.baseList.map((item, index) => ({
      isLeftIndex: this.leftIndex === index,
      isRightIndex: this.rightIndex === index,
      isPivot: this.pivotIndex === index,
      datum: item.value,
      id: item.id,
    }))
    return result
  }

  @action.bound
  shuffle() {
    const newList = shuffle(this.baseList.slice())
    this.baseList = newList
  }

  @action.bound
  restart() {
    this.baseList = initialBaseList
    this.quickSortGen = null
    this.leftIndex = null
    this.rightIndex = null
    this.pivotIndex = null
    this.done = false
  }

  @action.bound
  add() {
    if (this.baseList.length > 30) {
      return
    }
    const newItem = {
      value: getRandomNumberBetweenXandY(1, this.baseList.length),
      id: getRandomId(),
    }
    const newList = this.baseList.map(item => ({ value: item.value, id: item.id }))
    newList.splice(getRandomNumberBetweenXandY(0, this.baseList.length), 0, newItem)

    this.baseList = newList
  }

  @action.bound
  step() {
    if (!this.quickSortGen) {
      this.quickSortGen = quickSort({ items: this.baseList })
      this.inProgress = true
    }

    const {
      value: {
        items, leftIndex, rightIndex, pivotIndex,
      }, done,
    } = this.quickSortGen.next()

    this.done = done
    this.baseList = items
    this.leftIndex = leftIndex
    this.rightIndex = rightIndex
    this.pivotIndex = pivotIndex
    if (this.done) {
      this.inProgress = false
    }
  }
}

const observableListStore = new ListStore()

export default observableListStore
