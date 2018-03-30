import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Button } from 'material-ui'
import styled from 'styled-components'

const StyledForm = styled.div`
  width: 100%;
  height: 100%;

  .back-button {
    position: absolute;
    top: 20px;
    left: 20px;
  }
`

class AttendanceForm extends PureComponent {
  render () {
    const { onStop } = this.props

    return (
      <StyledForm>
        <Button
          onClick={onStop}
          variant='raised'
          className='back-button'>
          Parar chamada
        </Button>
      </StyledForm>
    )
  }
}

AttendanceForm.propTypes = {
  onStop: PropTypes.func.isRequired
}

export default AttendanceForm
