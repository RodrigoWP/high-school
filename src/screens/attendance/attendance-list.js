import React, { PureComponent } from 'react'
import Table, { TableBody, TableCell, TableHead, TableRow } from 'material-ui/Table'
import { IconButton } from 'material-ui'
import DeleteIcon from 'material-ui-icons/Delete'
import Paper from 'material-ui/Paper'
import { getAttendances, removeAttendance } from '../../models/attendance'

class AttendanceList extends PureComponent {
  state = {
    attendances: []
  }

  componentDidMount () {
    this.searchAttendances()
  }

  searchAttendances = () => {
    getAttendances(attendances => this.setState({ attendances }))
  }

  handleRemove = (attendanceId) => {
    removeAttendance(attendanceId)
  }

  render () {
    const { attendances } = this.state

    return (
      <Paper style={{ marginTop: '20px' }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Data da chamada</TableCell>
              <TableCell>Periodo</TableCell>
              <TableCell padding='checkbox'></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {attendances.map((attendance, index) => (
              <TableRow key={index}>
                <TableCell>{attendance.date}</TableCell>
                <TableCell>{attendance.period}</TableCell>
                <TableCell padding='checkbox'>
                  <IconButton onClick={() => this.handleRemove(attendance.id)} aria-label='Delete'>
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

export default AttendanceList
