import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import Table, { TableBody, TableCell, TableHead, TableRow } from 'material-ui/Table'
import { IconButton } from 'material-ui'
import DeleteIcon from 'material-ui-icons/Delete'
import Paper from 'material-ui/Paper'
import { getStudentsAttendance, removeStudentAttendance } from '../../models/attendance'

class CurrAttendanceList extends PureComponent {
  state = {
    attendances: []
  }

  componentDidMount () {
    this.mounted = true
    this.searchAttendances()
  }

  componentWillUnmount () {
    this.mounted = false
  }

  searchAttendances = () => {
    const { attendanceId } = this.props

    getStudentsAttendance(attendanceId, (attendances) => {
      if (this.mounted) {
        this.setState({ attendances })
      }
    })
  }

  handleRemove = (studentCode) => {
    const { attendanceId } = this.props

    removeStudentAttendance(attendanceId, studentCode)
  }

  render () {
    const { attendances } = this.state

    return (
      <Paper style={{ marginTop: '20px' }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Aluno</TableCell>
              <TableCell>Presente</TableCell>
              <TableCell padding='checkbox'></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {attendances.map((attendance, index) => (
              <TableRow key={index}>
                <TableCell>{attendance.name}</TableCell>
                <TableCell>{attendance.present ? 'Sim' : 'Não'}</TableCell>
                <TableCell padding='checkbox'>
                  <IconButton onClick={() => this.handleRemove(attendance.code)} aria-label='Delete'>
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
    )
  }
}

CurrAttendanceList.propTypes = {
  attendanceId: PropTypes.string
}

export default CurrAttendanceList
