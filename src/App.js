import React, {Component} from "react"
import quickSort from "./quicksort"
import shuffle from "lodash/shuffle"
import EntityList from "./components/List"
import styled from "styled-components"
import "./App.css"

// https://www.nczonline.net/blog/tag/computer-science/

const AppWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  min-width: 100vw;
`

const StyledButton = styled.button`
  font-size: 2rem;
  border-radius: 10px;
  cursor: pointer;
`

const ButtonWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  padding: 10px;
`

const getRandomNumberBetweenXandY = (x, y) => {
  return Math.floor(Math.random() * y) + x
}

const getUnsortedListByLength = len => {
  const res = []
  while (res.length - 1 < len) {
    res.push(getRandomNumberBetweenXandY(1, Math.max(len + 1, 10)))
  }
  return res
}

const UNSORTED_LIST = getUnsortedListByLength(6)

const UNSORTED_LIST_WITH_ID = UNSORTED_LIST.map((item, index) => ({
  value: item,
  id: index,
}))

const transformToDisplayed = originalList => ({leftIndex, rightIndex, pivotIndex, items}) => {
  return items.map((item, index) => ({
    isLeftIndex: leftIndex === index,
    isRightIndex: rightIndex === index,
    isPivot: pivotIndex === index,
    datum: item.value,
    id: originalList.find(listItem => item.id === listItem.id).id,
  }))
}

const initialState = {
  quickSortGen: quickSort({items: UNSORTED_LIST_WITH_ID.slice()}),
  leftIndex: null,
  rightIndex: null,
  items: transformToDisplayed(UNSORTED_LIST_WITH_ID)({
    leftIndex: null,
    rightIndex: null,
    items: UNSORTED_LIST_WITH_ID,
    pivotIndex: null,
  }),
  done: false,
  inProgress: false,
}

const getNewSliceForState = (prevState, newList) => ({
  ...prevState,
  items: transformToDisplayed(newList)({
    leftIndex: null,
    rightIndex: null,
    items: newList,
    pivotIndex: null,
  }),
  quickSortGen: quickSort({items: newList.slice()}),
})

class App extends Component {
  state = initialState

  step = () => {
    const {value, done} = this.state.quickSortGen.next()
    const displayedItems = transformToDisplayed(this.state.items)(value)
    return this.setState({
      ...this.state,
      items: displayedItems,
      done,
      inProgress: !done,
    })
  }

  restart = () => {
    this.setState({
      ...initialState,
      quickSortGen: quickSort({items: UNSORTED_LIST_WITH_ID.slice()}),
    })
  }

  // addItem = () => {
  //   const newItemValue = getRandomNumberBetweenXandY(1, this.state.items.length)
  //   const newList = this.state.items.slice(0)
  //   newList.push({
  //     datum: newItemValue,
  //     id: this.state.items.length,
  //     isLeftIndex: false,
  //     isRightIndex: false,
  //     isPivot: false,
  //   })

  //   this.setState(getNewSliceForState(this.state, newList))
  // }

  shuffle = () => {
    const newList = shuffle(UNSORTED_LIST_WITH_ID)
    this.setState(getNewSliceForState(this.state, newList))
  }

  render() {
    const {done, inProgress} = this.state
    const clickHandler = done ? this.restart : this.step
    return (
      <AppWrapper>
        <div>
          <ButtonWrapper>
            <StyledButton onClick={clickHandler}>{done ? "Restart" : "Step forward"}</StyledButton>
            {!inProgress && <StyledButton onClick={this.shuffle}>Shuffle</StyledButton>}
            {/* {!inProgress && (
              <StyledButton onClick={this.addItem}>Add item</StyledButton>
            )} */}
          </ButtonWrapper>
          <EntityList entities={this.state.items} />
          {this.state.done && <div>Sorted</div>}
        </div>
      </AppWrapper>
    )
  }
}

export default App
