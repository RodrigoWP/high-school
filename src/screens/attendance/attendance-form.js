import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Button, TextField } from 'material-ui'
import styled from 'styled-components'

const StyledForm = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  marginTop: 40px;

  .header {
    display: inline-flex;
    width: 100%;
  }

  .back-button {
    position: relative;
    top: 27px;
    left: 0;
  }
`

class AttendanceForm extends PureComponent {
  state = {
    studentCode: null
  }

  handleChangeCode = (e) => {
    const { value } = e.target

    this.setState({
      studentCode: value
    })
  }

  render () {
    const { studentCode } = this.state
    const { onStop } = this.props

    return (
      <StyledForm>
        <div className='header'>
          <Button
            onClick={onStop}
            variant='raised'
            style={{ width: '270px', height: '35px' }}
            className='back-button'>
            Parar chamada
          </Button>

          <TextField
            label='Código do aluno'
            value={studentCode}
            onChange={this.handleChangeCode}
            placeholder='Código de matrícula do aluno'
            fullWidth
            margin='normal'
            style={{ marginLeft: '20px' }}
          />
        </div>
      </StyledForm>
    )
  }
}

AttendanceForm.propTypes = {
  onStop: PropTypes.func.isRequired
}

export default AttendanceForm
