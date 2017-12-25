// @flow

import * as React from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import type { Dispatch } from 'redux'
import algorithmNames from './constants/algorithmNames'
import QuickSort from './views/QuickSortRunner'
import MergeSort from './views/MergeSortRunner'
import { baseListSelector } from './reducers/list'
import { isInProgressSelector, isDoneSelector } from './reducers/quickSort'
import type { State } from './reducers/root'
import type { BaseList } from './types/BaseListItem.js.flow'
import {
  createNextAction,
  createStartAction,
  createShuffleAction,
  createRestartAction,
  createAddAction,
} from './actions'
import type { AppAction } from './types/Actions.js.flow'

const AppWrapper = styled.div`
  display: flex;
  flex-direction: column;
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

type StateProps = {
  inProgress: boolean,
  done: boolean,
  baseList: BaseList,
}

type DispatchProps = {
  start: BaseList => ($Keys<typeof algorithmNames>, boolean) => any,
  next: () => any,
  restart: () => any,
  shuffle: () => any,
  add: () => any,
}

const mapStateToProps = (state: State): StateProps => ({
  inProgress: isInProgressSelector(state),
  done: isDoneSelector(state),
  baseList: baseListSelector(state),
})

const mapDispatchToProps = (dispatch: Dispatch<AppAction>): DispatchProps => ({
  next: () => dispatch(createNextAction()),
  restart: () => dispatch(createRestartAction()),
  shuffle: () => dispatch(createShuffleAction()),
  add: () => dispatch(createAddAction()),
  start: (list: BaseList) => (algorithmName: $Keys<typeof algorithmNames>, isAutomatic: boolean) =>
    dispatch(createStartAction(algorithmName, list, isAutomatic)),
})

const mergeProps = (stateProps: StateProps, dispatchProps: DispatchProps, ownProps: Object) => ({
  ...ownProps,
  ...stateProps,
  ...dispatchProps,
  start: dispatchProps.start(stateProps.baseList),
})

class App extends React.Component<*> {
  handleClick = (algorithmName, isAutomatic) => {
    const { inProgress, done, next, restart, start } = this.props
    if (inProgress) {
      next()
      return
    }
    if (done) {
      restart(algorithmName)
      return
    }
    start(algorithmName, isAutomatic)
  }

  render() {
    const { shuffle, add, inProgress } = this.props
    return (
      <Router>
        <AppWrapper>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/quicksort">Quicksort</Link>
            </li>
            <li>
              <Link to="/mergesort">Mergesort</Link>
            </li>
          </ul>
          <div>
            <ButtonWrapper>
              {!inProgress && <StyledButton onClick={shuffle}>Shuffle</StyledButton>}
              {!inProgress && <StyledButton onClick={add}>Add item</StyledButton>}
            </ButtonWrapper>
          </div>
          <div>
            <Route render={() => <QuickSort clickHandler={this.handleClick} />} path="/quicksort" />
            <Route component={MergeSort} path="/mergesort" />
          </div>
        </AppWrapper>
      </Router>
    )
  }
}

const DecoratedApp = connect(mapStateToProps, mapDispatchToProps, mergeProps)(App)

export default DecoratedApp
