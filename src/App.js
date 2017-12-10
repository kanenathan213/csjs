import React, { Component } from 'react'
import styled from 'styled-components'
import { StaggeredMotion, spring } from 'react-motion'
import quickSort from './quicksort'
import './App.css'

// https://www.nczonline.net/blog/tag/computer-science/

const UNSORTED_LIST = [4, 2, 6, 5, 3, 9]

const StyledEntity = styled.div`
  border-radius: 50%;
  background: ${({ 'data-is-pivot': isPivot }) => {
    if (isPivot) {
      return 'purple'
    }
    return 'teal'
  }};
  height: 100px;
  width: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 5px;
`

const Container = styled.div`
  display: flex;
  grid-template-columns: 1fr;
  grid-template-rows: auto;
  grid-gap: 10px 10px;
  justify-content: center;
  margin: 0 auto;
  width: 100%;
`

const Wrapper = styled.div`
  border-bottom: ${({ 'data-is-index': isIndex }) => {
    if (isIndex) {
      return '1px solid black'
    }
    return 'none'
  }};
`

const Entity = ({ entity, index, interpolatingStyles }) => (
  <Wrapper data-is-index={entity.isIndex}>
    <StyledEntity
      key={index}
      style={{ height: interpolatingStyles[index].h }}
      data-is-index={entity.isIndex}
      data-is-pivot={entity.isPivot}
    >
      {entity.datum}
    </StyledEntity>
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      {entity.isLeftIndex && <div style={{ color: 'blue' }}>&uarr;</div>}
      {entity.isRightIndex && <div style={{ color: 'green' }}>&uarr;</div>}
    </div>
  </Wrapper>
)

const EntityList = ({ entities }) => (
  <StaggeredMotion
    defaultStyles={entities.map(() => ({ h: 0 }))}
    styles={prevInterpolatedStyles =>
      prevInterpolatedStyles.map((_, i) => {
        return i === 0
          ? { h: spring(100) }
          : { h: spring(prevInterpolatedStyles[i - 1].h) }
      })
    }
  >
    {interpolatingStyles => (
      <Container>
        {entities.map((entity, index) => (
          <Entity
            entity={entity}
            index={index}
            key={index}
            interpolatingStyles={interpolatingStyles}
          />
        ))}
      </Container>
    )}
  </StaggeredMotion>
)

const transformToDisplayed = ({ leftIndex, rightIndex, pivotIndex, items }) => {
  return items.map((item, index) => ({
    isLeftIndex: leftIndex === index,
    isRightIndex: rightIndex === index,
    isPivot: pivotIndex === index,
    datum: item,
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
        <EntityList entities={this.state.items} />
        {!this.state.done && <button onClick={this.step}>Step forward</button>}
        {this.state.done && <div>Sorted</div>}
      </div>
    )
  }
}

export default App
