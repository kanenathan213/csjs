import * as React from 'react'
import styled from 'styled-components'

const Wrapper = styled.div`
  border-bottom: ${({ 'data-is-index': isIndex }) => {
    if (isIndex) {
      return '1px solid black'
    }
    return 'none'
  }};
`

const StyledEntity = styled.div`
  border-radius: 50%;
  background: ${({ 'data-is-pivot': isPivot }) => {
    if (isPivot) {
      return 'purple'
    }
    return 'teal'
  }};
  height: 100px;
  width: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 5px;
`

class Entity extends React.Component {
  render() {
    const { entity } = this.props
    return (
      <Wrapper data-is-index={entity.isIndex}>
        <StyledEntity
          data-is-index={entity.isIndex}
          data-is-pivot={entity.isPivot}
        >
          {entity.datum}
        </StyledEntity>
      </Wrapper>
    )
  }
}

export default Entity
