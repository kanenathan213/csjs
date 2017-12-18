// @flow

import * as React from 'react'
import styled from 'styled-components'

const StyledEntity = styled.div`
  border-radius: 50%;
  background: ${({ 'data-is-pivot': isPivot }) => {
    if (isPivot) {
      return 'blue'
    }
    return 'teal'
  }};
  color: white;
  font-size: 28px;
  height: 100px;
  width: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 5px;
`

type Props = {
  entity: {
    isPivot: boolean,
    datum: number,
  },
}

/* eslint-disable */
class Entity extends React.Component<Props> {
  render() {
    const { entity } = this.props
    return (
      <div>
        <StyledEntity data-is-pivot={entity.isPivot}>{entity.datum || entity.value}</StyledEntity>
      </div>
    )
  }
}
export default Entity
