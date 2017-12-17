// @flow

import { createSelector } from 'reselect'
import type { State } from '../reducers/root'
import { baseListSelector } from '../reducers/list'
import { indicesSelector } from '../reducers/quickSort'
import type { BaseListItem } from '../types/BaseListItem.js.flow'
import type { DisplayableQuickSortItem } from '../types/DisplayableQuickSortItem.js.flow'

const selector: (state: State) => Array<DisplayableQuickSortItem> = createSelector(
  baseListSelector,
  indicesSelector,
  (
    baseList: Array<BaseListItem>,
    { leftIndex, rightIndex, pivotIndex },
  ): Array<DisplayableQuickSortItem> =>
    baseList.map((item, index) => ({
      isLeftIndex: leftIndex === index,
      isRightIndex: rightIndex === index,
      isPivot: pivotIndex === index,
      datum: item.value,
      id: item.id,
    })),
)

export default selector
