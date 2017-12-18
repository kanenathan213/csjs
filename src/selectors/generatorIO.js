// @flow

import { createSelector } from 'reselect'
import type { State } from '../reducers/root'
import { currentSortingListSelector, indicesSelector } from '../reducers/quickSort'
import type { BaseListItem } from '../types/BaseListItem.js.flow'
import type { DisplayableQuickSortItem } from '../types/DisplayableQuickSortItem.js.flow'

const selector: (state: State) => Array<DisplayableQuickSortItem> = createSelector(
  currentSortingListSelector,
  indicesSelector,
  (sortingList: Array<BaseListItem>, indices): Array<DisplayableQuickSortItem> => ({
    items: sortingList,
    ...indices,
  })
)

export default selector
