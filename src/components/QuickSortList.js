// @flow

import * as React from 'react'
import range from 'lodash/range'
import FlipMove from 'react-flip-move'
import { Motion, spring } from 'react-motion'
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

const MotionContainer = styled.div`
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
  pivotIndex: ?number,
  leftIndex: ?number,
  rightIndex: ?number,
  inProgress: boolean,
}

class QuickSortList extends React.Component<Props> {
  renderItems = () => this.props.displayableListData.map(entity => <Item entity={entity} key={entity.id} />)

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
    const { displayableListData: entities, pivotIndex, leftIndex, rightIndex, inProgress } = this.props
    if (!entities) return null

    return (
      <div>
        <Container>
          <FlipMove staggerDurationBy="30" duration={500} style={{ display: 'flex' }}>
            {this.renderItems()}
          </FlipMove>
        </Container>
        {inProgress && (
          <div>
            <MotionContainer>
              <Motion style={{ x: pivotIndex ? spring(pivotIndex) : 0 }}>
                {({ x }) =>
                  x >= 0 && (
                    <div
                      style={{
                        color: 'blue',
                        WebkitTransform: `translate3d(${x * 100 + 50}px, 0, 0)`,
                        transform: `translate3d(${x * 100 + 50}px, 0, 0)`,
                      }}
                    >
                      <div>Pivot</div>
                    </div>
                  )
                }
              </Motion>
            </MotionContainer>
            <MotionContainer>
              <Motion style={{ x: leftIndex ? spring(leftIndex) : 0 }}>
                {({ x }) =>
                  x >= 0 && (
                    <div
                      style={{
                        color: 'blue',
                        WebkitTransform: `translate3d(${x * 100 + 50}px, 0, 0)`,
                        transform: `translate3d(${x * 100 + 50}px, 0, 0)`,
                      }}
                    >
                      <div>&uarr;</div>
                      <div>
                        Left<br />index
                      </div>
                    </div>
                  )
                }
              </Motion>
            </MotionContainer>
            <MotionContainer>
              <Motion style={{ x: rightIndex ? spring(rightIndex) : 0 }}>
                {({ x }) =>
                  x >= 0 && (
                    <div
                      style={{
                        color: 'green',
                        WebkitTransform: `translate3d(${x * 100 + 50}px, 0, 0)`,
                        transform: `translate3d(${x * 100 + 50}px, 0, 0)`,
                      }}
                    >
                      <div>&uarr;</div>
                      <div>
                        Right<br />index
                      </div>
                    </div>
                  )
                }
              </Motion>
            </MotionContainer>
          </div>
        )}
      </div>
    )
  }
}

export default QuickSortList
