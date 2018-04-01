import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Button, TextField } from 'material-ui'
import styled from 'styled-components'
import { getStudentByCode } from '../../models/student'
import { createStudentRegister } from '../../models/attendance'
import CurrAttendanceList from './curr-attendance-list'

const StyledForm = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  margin-top: 40px;

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
    studentCode: ''
  }

  handleChangeCode = (e) => {
    const { value } = e.target

    this.setState({
      studentCode: value
    })
  }

  createRegister = async () => {
    const { studentCode } = this.state
    const { attendanceId } = this.props
    const student = await getStudentByCode(studentCode)

    if (student === null) return

    createStudentRegister(attendanceId, student)

    this.clearCodeField()
  }

  finishAttendanceList = () => {
    const { attendanceId } = this.props

    createStudentRegister(attendanceId)

    this.clearCodeField()
  }

  clearCodeField = () => {
    this.setState({
      studentCode: ''
    })
  }

  render () {
    const { studentCode } = this.state
    const { onStop, attendanceId } = this.props

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

          <Button
            onClick={this.createRegister}
            variant='raised'
            style={{ width: '270px', height: '35px', marginLeft: '20px' }}
            className='back-button'>
            Chamar aluno
          </Button>

          <Button
            onClick={this.finishAttendanceList}
            variant='raised'
            style={{ width: '270px', height: '35px', marginLeft: '20px' }}
            className='back-button'>
            Finalizar chamada
          </Button>
        </div>

        <CurrAttendanceList
        attendanceId={attendanceId}
        />
      </StyledForm>
    )
  }
}

AttendanceForm.propTypes = {
  onStop: PropTypes.func.isRequired,
  attendanceId: PropTypes.string
}

export default AttendanceForm
