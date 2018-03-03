// @flow

import * as React from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'
import { createStartAction, createNextAction } from '../actions'
import algorithmNames from '../constants/algorithmNames'
import List from '../components/InsertionSortList'
import type { State } from '../reducers/root'
import { baseListSelector } from '../reducers/list'
import { currentListSelector, inProgressSelector } from '../reducers/insertionSort'
import type { BaseList } from '../types/BaseListItem.js.flow'
import type { DisplayableMergeSortItem } from '../types/DisplayableMergeSortItem.js.flow'

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
  originalList: BaseList, // eslint-disable-line
  currentList: BaseList,
  baseList: BaseList,
}

type DispatchProps = {
  start: BaseList => () => any,
  next: () => any,
}

const mapStateToProps = (state: State): StateProps => ({
  currentList: currentListSelector(state),
  baseList: baseListSelector(state),
  inProgress: inProgressSelector(state),
})

const mapDispatchToProps = (dispatch: Dispatch<Object>): DispatchProps => ({
  start: list => () => dispatch(createStartAction(algorithmNames.INSERTIONSORT, list)),
  next: () => dispatch(createNextAction()),
})

const mergeProps = (stateProps: StateProps, dispatchProps: DispatchProps, ownProps: Object) => ({
  ...ownProps,
  ...stateProps,
  ...dispatchProps,
  start: dispatchProps.start(stateProps.baseList),
})

const Runner = ({ inProgress, currentList, next, start, done }: StateProps & DispatchProps) => (
  <div>
    <hr />
    <h2>Insertion sort</h2>
    {!done && (
      <ButtonWrapper>
        <StyledButton onClick={inProgress ? next : start}>{inProgress ? 'Next' : 'Start'}</StyledButton>
      </ButtonWrapper>
    )}
    Base list:
    <List entities={currentList} />
    {done && <div>Sorted</div>}
  </div>
)

const DecoratedRunner = connect(mapStateToProps, mapDispatchToProps, mergeProps)(Runner)

export default DecoratedRunner
