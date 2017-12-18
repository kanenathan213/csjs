// @flow

import * as React from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'
import algorithmNames from '../constants/algorithmNames'
import List from '../components/QuickSortList'
import type { State } from '../reducers/root'
import { indicesSelector, isInProgressSelector } from '../reducers/quickSort'
import displayableQuickSortItems from '../selectors/displayableQuickSortItems'
import type { DisplayableQuickSortItem } from '../types/DisplayableQuickSortItem.js.flow'

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
  clickHandler: any => void,
  displayableListData: Array<DisplayableQuickSortItem>,
  pivotIndex: ?number,
  leftIndex: ?number,
  rightIndex: ?number,
  inProgress: boolean,
}

const mapStateToProps = (state: State, ownProps: { clickHandler: any => void }): StateProps => ({
  ...indicesSelector(state),
  displayableListData: displayableQuickSortItems(state),
  inProgress: isInProgressSelector(state),
  ...ownProps,
})

const QuickSortRunner = ({
  clickHandler,
  displayableListData,
  pivotIndex,
  leftIndex,
  rightIndex,
  inProgress,
}: StateProps) => (
  <div>
    <ButtonWrapper>
      <StyledButton onClick={() => clickHandler(algorithmNames.QUICKSORT, false)}>
        {inProgress ? 'Next' : 'Start'}
      </StyledButton>
    </ButtonWrapper>
    {!inProgress && (
      <ButtonWrapper>
        <StyledButton onClick={() => clickHandler(algorithmNames.QUICKSORT, true)}>Play</StyledButton>
      </ButtonWrapper>
    )}
    <List
      displayableListData={displayableListData}
      pivotIndex={pivotIndex}
      leftIndex={leftIndex}
      rightIndex={rightIndex}
      inProgress={inProgress}
    />
  </div>
)

const DecoratedQuickSortRunner = connect(mapStateToProps)(QuickSortRunner)

export default DecoratedQuickSortRunner
