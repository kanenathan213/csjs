// @flow

import { createSelector } from 'reselect'
import type { State } from '../reducers/root'
import { baseListSelector } from '../reducers/list'
import { currentSortingListSelector, indicesSelector } from '../reducers/quickSort'
import type { BaseListItem } from '../types/BaseListItem.js.flow'
import type { DisplayableQuickSortItem } from '../types/DisplayableQuickSortItem.js.flow'

const selector: (state: State) => Array<DisplayableQuickSortItem> = createSelector(
  currentSortingListSelector,
  baseListSelector,
  indicesSelector,
  (
    currentSortingList: Array<BaseListItem>,
    baseList,
    { leftIndex, rightIndex, pivotIndex }
  ): Array<DisplayableQuickSortItem> => {
    const listToUse = currentSortingList.length > 0 ? currentSortingList : baseList
    return listToUse.map((item, index) => ({
      isLeftIndex: leftIndex === index,
      isRightIndex: rightIndex === index,
      isPivot: pivotIndex === index,
      datum: item.value,
      id: item.id,
    }))
  }
)

export default selector
