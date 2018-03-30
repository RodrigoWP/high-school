import React, { PureComponent } from 'react'
import { TextField, Button, IconButton, Paper } from 'material-ui'
import Table, { TableBody, TableCell, TableHead, TableRow } from 'material-ui/Table'
import DeleteIcon from 'material-ui-icons/Delete'
import {
  createAttendance,
  removeAttendance,
  getStudents,
  createAttendanceStudent,
  clearAttendancesStudents,
  updateAttendanceStudentToPresent,
  updateAllAttendanceStudentToNotPresent,
  getAttendancesStudents
} from '../../utils/firebase'
import moment from 'moment'

class Attendance extends PureComponent {
  state = {
    isInProgress: false,
    studentCode: '',
    attendanceId: '',
    students: []
  }

  handleAttendance = () => {
    const { isInProgress } = this.state

    isInProgress ? this.cancelAttendance() : this.startNewAttendance()
  }

  cancelAttendance = () => {
    this.setState({
      isInProgress: false
    })

    removeAttendance(this.state.attendanceId)
    clearAttendancesStudents()
    this.clearStudents()
  }

  startNewAttendance = () => {
    this.setState({
      isInProgress: true
    })

    this.createNewAttendance()
  }

  createNewAttendance = () => {
    const currentDate = moment().format('DD/MM/YYYY')
    const attendanceId = createAttendance({ currentDate })

    this.setState({ attendanceId })

    this.createRollList(attendanceId)
  }

  createRollList = (attendanceId) => {
    getStudents(students => {
      this.createRoll(students, attendanceId)
      this.searchRollList()
    }, true)
  }

  createRoll = (students, attendanceId) => {
    const attendancesStudents = students.map(student => {
      const attendaceStudent = {
        attendanceId,
        studentCode: student.code,
        studentName: student.name,
        present: null
      }

      createAttendanceStudent(attendaceStudent, student.code)

      return attendaceStudent
    })
  }

  searchRollList = () => {
    getAttendancesStudents(students => this.setState({ students }))
  }

  clearStudents = () => {
    this.setState({ students: [] })
  }

  callStudentOnAttendance = () => {
    const { studentCode } = this.state

    updateAttendanceStudentToPresent(studentCode)
  }

  finishCallRoll = () => {
    const { students } = this.state
    const studentsCode = students.filter(item => !item.present).map(student => student.studentCode)

    updateAllAttendanceStudentToNotPresent(studentsCode)


  }

  studentCodeChange = (e) => {
    this.setState({
      studentCode: e.target.value
    })
  }

  render () {
    const { isInProgress, studentCode, students } = this.state

    return (
      <div>
        {isInProgress && (
          <React.Fragment>
            <TextField
              label='Código'
              value={studentCode}
              onChange={this.studentCodeChange}
              placeholder='Código de matrícula do aluno'
              margin='normal'
              style={{ marginRight: '10px' }}
            />
            <Button
              variant='raised'
              color='default'
              onClick={this.callStudentOnAttendance}
              style={{ marginRight: '10px' }}>
              Chamar
            </Button>
            <Button
              variant='raised'
              color='default'
              onClick={this.finishCallRoll}
              style={{ marginRight: '10px' }}>
              Finalizar chamada
            </Button>
          </React.Fragment>
        )}
        <Button
          variant='raised'
          color='primary'
          onClick={this.handleAttendance}>
          {isInProgress ? 'Cancelar chamada' : 'Iniciar nova chamada'}
        </Button>
        <br />
        <br />
        <h2>Chamada</h2>
          <Paper>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Nome do aluno</TableCell>
                  <TableCell>Presente</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {students.map((attendanceStudent, index) => (
                  <TableRow key={index}>
                    <TableCell>{attendanceStudent.studentName}</TableCell>
                    <TableCell>{typeof attendanceStudent.present === 'undefined' ? 'Pendente' : attendanceStudent.present ? 'Sim' : 'Não'}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
        </Paper>
      </div>
    )
  }
}

export default Attendance
