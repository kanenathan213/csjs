// @flow

import * as React from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'
import { createStartAction, createNextAction } from '../actions'
import algorithmNames from '../constants/algorithmNames'
import List from '../components/MergeSortList'
import { baseListSelector } from '../reducers/list'
import type { State } from '../reducers/root'
import { currentSortingListSelector, isInProgressSelector, sortedListSelector } from '../reducers/mergeSort'
import type { BaseList } from '../types/BaseListItem.js.flow'

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
  currentSortingList: BaseList,
  sortedList: BaseList,
  baseList: BaseList,
}

type DispatchProps = {
  start: BaseList => () => any,
  next: () => any,
}

const mapStateToProps = (state: State): StateProps => ({
  baseList: baseListSelector(state),
  currentSortingList: currentSortingListSelector(state),
  sortedList: sortedListSelector(state),
  inProgress: isInProgressSelector(state),
})

const mapDispatchToProps = (dispatch: Dispatch<Object>): DispatchProps => ({
  start: list => () => dispatch(createStartAction(algorithmNames.MERGESORT, list)),
  next: () => dispatch(createNextAction()),
})

const mergeProps = (stateProps: StateProps, dispatchProps: DispatchProps, ownProps: Object) => ({
  ...ownProps,
  ...stateProps,
  ...dispatchProps,
  start: dispatchProps.start(stateProps.baseList),
})

const MergeSortRunner = ({
  inProgress,
  currentSortingList,
  baseList,
  next,
  start,
  sortedList,
}: StateProps & DispatchProps) => (
  <div>
    <hr />
    <h2>Merge sort</h2>
    <ButtonWrapper>
      <StyledButton onClick={start}>{inProgress ? 'Next' : 'Start'}</StyledButton>
    </ButtonWrapper>
    {inProgress && (
      <ButtonWrapper>
        <StyledButton onClick={next}>Next</StyledButton>
      </ButtonWrapper>
    )}
    <List entities={currentSortingList.length > 0 ? currentSortingList : baseList} />
    <List entities={sortedList} />
  </div>
)

const DecoratedQuickSortRunner = connect(mapStateToProps, mapDispatchToProps, mergeProps)(MergeSortRunner)

export default DecoratedQuickSortRunner
