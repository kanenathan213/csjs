import React, { Component } from 'react'
import quickSort from './quicksort'
import EntityList from './components/List'
import './App.css'

// https://www.nczonline.net/blog/tag/computer-science/

const UNSORTED_LIST = [4, 2, 6, 5, 3, 9]

const transformToDisplayed = ({ leftIndex, rightIndex, pivotIndex, items }) => {
  return items.map((item, index) => ({
    isLeftIndex: leftIndex === index,
    isRightIndex: rightIndex === index,
    isPivot: pivotIndex === index,
    datum: item,
    id: UNSORTED_LIST.findIndex(listItem => item === listItem),
  }))
}

class App extends Component {
  state = {
    quickSortGen: quickSort(UNSORTED_LIST.slice()),
    leftIndex: null,
    rightIndex: null,
    items: transformToDisplayed({
      leftIndex: null,
      rightIndex: null,
      items: UNSORTED_LIST,
      pivotIndex: null,
    }),
    done: false,
  }

  componentWillMount() {
    // calling it once to get through initial yield
    const { value, done } = this.state.quickSortGen.next()
    const displayedItems = transformToDisplayed(value)
    return this.setState({ ...this.state, items: displayedItems, done })
  }

  step = () => {
    if (this.state.done) {
      return
    }
    const { value, done } = this.state.quickSortGen.next()
    const displayedItems = transformToDisplayed(value)
    return this.setState({ ...this.state, items: displayedItems, done })
  }

  render() {
    return (
      <div className="App">
        {!this.state.done && <button onClick={this.step}>Step forward</button>}
        <EntityList entities={this.state.items} />
        {this.state.done && <div>Sorted</div>}
      </div>
    )
  }
}

export default App
