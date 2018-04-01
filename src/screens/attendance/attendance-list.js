import React, { PureComponent } from 'react'
import Table, { TableBody, TableCell, TableHead, TableRow } from 'material-ui/Table'
import { IconButton } from 'material-ui'
import DeleteIcon from 'material-ui-icons/Delete'
import FileDownload from 'material-ui-icons/FileDownload'
import Paper from 'material-ui/Paper'
import { getAttendances, removeAttendance, getAttendanceById } from '../../models/attendance'

class AttendanceList extends PureComponent {
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
    getAttendances(attendances => {
      if (this.mounted) {
        this.setState({ attendances })
      }
    })
  }

  handleRemove = (attendanceId) => {
    removeAttendance(attendanceId)
  }

  export = async (attendanceId) => {
    const attendance = await getAttendanceById(attendanceId)
    const { date, period, students } = attendance

    const exportData = students.map(student => {
      return {
        codigo: student.code,
        aluno: student.name,
        presente: student.present ? 'Sim' : 'Não',
        periodo: period,
        data: date
      }
    })

    console.log('exportData: ', exportData)
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
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {attendances.map((attendance, index) => (
              <TableRow key={index}>
                <TableCell>{attendance.date}</TableCell>
                <TableCell>{attendance.period}</TableCell>
                <TableCell>
                  <IconButton onClick={() => this.handleRemove(attendance.id)} aria-label='Delete'>
                    <DeleteIcon />
                  </IconButton>
                  <IconButton onClick={() => this.export(attendance.id)} aria-label='file-download'>
                    <FileDownload />
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
