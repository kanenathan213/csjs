import * as React from 'react'
import Entity from './Item'
import FlipMove from 'react-flip-move'
import styled from 'styled-components'

const Container = styled(FlipMove)`
  display: flex;
  grid-template-columns: 1fr;
  grid-template-rows: auto;
  grid-gap: 10px 10px;
  justify-content: center;
  margin: 0 auto;
  width: 100%;
`

class EntityList extends React.Component {
  state = {
    enterLeaveAnimation: 'accordianVertical',
  }

  renderItems = () => {
    console.log(this.props.entities)
    return this.props.entities.map(entity => {
      return <Entity entity={entity} key={entity.id} />
    })
  }

  render() {
    const { enterLeaveAnimation } = this.state
    const { entities } = this.props

    return (
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
    )
  }
}

export default EntityList
