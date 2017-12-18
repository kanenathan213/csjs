// @flow

import * as React from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'
import type { Dispatch } from 'redux'
import algorithmNames from './constants/algorithmNames'
import QuickSort from './views/QuickSortRunner'
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
  start: BaseList => ($Keys<typeof algorithmNames>) => any,
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
  start: (list: BaseList) => (algorithmName: $Keys<typeof algorithmNames>) =>
    dispatch(createStartAction(algorithmName, list)),
})

const mergeProps = (stateProps: StateProps, dispatchProps: DispatchProps, ownProps: Object) => ({
  ...ownProps,
  ...stateProps,
  ...dispatchProps,
  start: dispatchProps.start(stateProps.baseList),
})

class App extends React.Component<*> {
  handleClick = (algorithmName, generator) => {
    const { inProgress, done, next, restart, start } = this.props
    if (inProgress) {
      next(generator)
      return
    }
    if (done) {
      restart(algorithmName)
      return
    }
    start(algorithmName)
  }

  render() {
    const { shuffle, add, inProgress } = this.props
    return (
      <AppWrapper>
        <div>
          <ButtonWrapper>
            {!inProgress && <StyledButton onClick={shuffle}>Shuffle</StyledButton>}
            {!inProgress && <StyledButton onClick={add}>Add item</StyledButton>}
          </ButtonWrapper>
          <QuickSort clickHandler={this.handleClick} />
        </div>
      </AppWrapper>
    )
  }
}

const DecoratedApp = connect(mapStateToProps, mapDispatchToProps, mergeProps)(App)

export default DecoratedApp
