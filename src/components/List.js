import * as React from "react"
import Entity from "./Item"
import range from "lodash/range"
import FlipMove from "react-flip-move"
import {Motion, spring} from "react-motion"
import styled from "styled-components"
import {UNSORTED_LIST} from "../config"

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

class EntityList extends React.Component {
  state = {
    enterLeaveAnimation: "accordianVertical",
  }

  renderItems = () => {
    return this.props.entities.map(entity => {
      return <Entity entity={entity} key={entity.id} />
    })
  }

  renderAnnotations = () => {
    return indices.map(currentIndex => {
      const entityAtCurrentIndex = this.props.entities[currentIndex]
      return (
        <AnnotationHolder key={currentIndex}>
          {entityAtCurrentIndex.isPivot && <div>Pivot</div>}
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              flexDirection: "column",
            }}
          >
            {entityAtCurrentIndex.isLeftIndex && (
              <div style={{color: "blue"}}>
                <div>&uarr;</div>
                <div>
                  Left<br />index
                </div>
              </div>
            )}
            {entityAtCurrentIndex.isRightIndex && (
              <div style={{color: "green"}}>
                {" "}
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
  }

  render() {
    const {enterLeaveAnimation} = this.state
    const {entities} = this.props
    const leftIndex = entities.findIndex(entity => entity.isLeftIndex)
    const rightIndex = entities.findIndex(entity => entity.isRightIndex)
    const pivotIndex = entities.findIndex(entity => entity.isPivot)

    return (
      <div>
        <Container>
          <FlipMove
            staggerDurationBy="30"
            duration={500}
            enterAnimation={enterLeaveAnimation}
            leaveAnimation={enterLeaveAnimation}
            typeName={null}
          >
            {this.renderItems()}
          </FlipMove>
        </Container>
        <MotionContainer>
          <Motion style={{x: spring(pivotIndex)}}>
            {(
              {x}, // children is a callback which should accept the current value of
            ) =>
              x >= 0 && (
                // `style`
                <div
                  style={{
                    color: "blue",
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
          <Motion style={{x: spring(leftIndex)}}>
            {(
              {x}, // children is a callback which should accept the current value of
            ) =>
              x >= 0 && (
                // `style`
                <div
                  style={{
                    color: "blue",
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
          <Motion style={{x: spring(rightIndex)}}>
            {(
              {x}, // children is a callback which should accept the current value of
            ) =>
              x >= 0 && (
                // `style`
                <div
                  style={{
                    color: "green",
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
    )
  }
}

export default EntityList
