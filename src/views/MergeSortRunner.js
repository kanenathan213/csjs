// @flow

import * as React from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'
import { createStartAction, createNextAction } from '../actions'
import algorithmNames from '../constants/algorithmNames'
import List from '../components/MergeSortList'
import type { State } from '../reducers/root'
import { baseListSelector } from '../reducers/list'
import { isInProgressSelector, topListSelector, mergingListSelector } from '../reducers/mergeSort'
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
  mergingList: BaseList,
  topList: Array<DisplayableMergeSortItem>,
}

type DispatchProps = {
  start: BaseList => () => any,
  next: () => any,
}

const mapStateToProps = (state: State): StateProps => ({
  originalList: baseListSelector(state),
  mergingList: mergingListSelector(state),
  topList: topListSelector(state),
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
  start: dispatchProps.start(stateProps.originalList),
})

const MergeSortRunner = ({ inProgress, topList, mergingList, next, start }: StateProps & DispatchProps) => (
  <div>
    <hr />
    <h2>Merge sort</h2>
    <ButtonWrapper>
      <StyledButton onClick={inProgress ? next : start}>{inProgress ? 'Next' : 'Start'}</StyledButton>
    </ButtonWrapper>
    Base list:
    <List entities={topList} />
    Merge: <List entities={mergingList} />
  </div>
)

const DecoratedMergeSortRunner = connect(mapStateToProps, mapDispatchToProps, mergeProps)(MergeSortRunner)

export default DecoratedMergeSortRunner
