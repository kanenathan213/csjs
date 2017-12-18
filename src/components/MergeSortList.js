// @flow

import * as React from 'react'
import range from 'lodash/range'
import FlipMove from 'react-flip-move'
import styled from 'styled-components'
import { UNSORTED_LIST } from '../config'
import Item from './Item'
import type { DisplayableQuickSortItem } from '../types/DisplayableQuickSortItem.js.flow'

const Container = styled(FlipMove)`
  display: flex;
  justify-content: center;
  margin: 0 auto;
  width: 100%;
`

const AnnotationHolder = styled.div`
  height: 100px;
  width: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 5px;
  flex-direction: column;
`
const indices = range(UNSORTED_LIST.length)

type Props = {
  displayableListData: Array<DisplayableQuickSortItem>,
}

class MergeSortList extends React.Component<Props> {
  renderItems = () => this.props.entities.map(entity => <Item entity={entity} key={entity.id} />)

  renderAnnotations = () =>
    indices.map(currentIndex => {
      const entityAtCurrentIndex = this.props.displayableListData[currentIndex]
      return (
        <AnnotationHolder key={currentIndex}>
          {entityAtCurrentIndex.isPivot && <div>Pivot</div>}
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              flexDirection: 'column',
            }}
          >
            {entityAtCurrentIndex.isLeftIndex && (
              <div style={{ color: 'blue' }}>
                <div>&uarr;</div>
                <div>
                  Left<br />index
                </div>
              </div>
            )}
            {entityAtCurrentIndex.isRightIndex && (
              <div style={{ color: 'green' }}>
                {' '}
                <div>&uarr;</div>
                <div>
                  Right<br />index
                </div>
              </div>
            )}
          </div>
        </AnnotationHolder>
      )
    })

  render() {
    const { entities } = this.props
    if (!entities) return null

    return (
      <div>
        <Container>
          <FlipMove staggerDurationBy="30" duration={500} style={{ display: 'flex' }}>
            {this.renderItems()}
          </FlipMove>
        </Container>
      </div>
    )
  }
}

export default MergeSortList
