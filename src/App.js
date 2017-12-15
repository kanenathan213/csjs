import * as React from 'react'
import { observer } from 'mobx-react'
import styled from 'styled-components'
import EntityList from './components/List'

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

@observer
class App extends React.Component<*> {
  getMainButtonLabel = () => {
    const { inProgress, done } = this.props.store.quickSortStore
    if (inProgress) {
      return 'Next step'
    }
    if (done) {
      return 'Restart'
    }
    return 'Start'
  }

  render() {
    const {
      done,
      step,
      restart,
      inProgress,
      displayableListData,
      pivotIndex,
      leftIndex,
      rightIndex,
    } = this.props.store.quickSortStore
    const { shuffle, add } = this.props.store
    const clickHandler = done ? restart : step
    const mainButtonLabel = this.getMainButtonLabel()
    return (
      <AppWrapper>
        <div>
          <ButtonWrapper>
            <StyledButton onClick={clickHandler}>{mainButtonLabel}</StyledButton>
            {!inProgress && <StyledButton onClick={shuffle}>Shuffle</StyledButton>}
            {!inProgress && <StyledButton onClick={add}>Add item</StyledButton>}
          </ButtonWrapper>
          <EntityList
            displayableListData={displayableListData}
            pivotIndex={pivotIndex}
            leftIndex={leftIndex}
            rightIndex={rightIndex}
            inProgress={inProgress}
          />
          {done && <div>Sorted</div>}
        </div>
      </AppWrapper>
    )
  }
}

export default App
