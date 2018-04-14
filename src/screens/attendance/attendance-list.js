import React, { PureComponent } from 'react'
import Table, { TableBody, TableCell, TableHead, TableRow } from 'material-ui/Table'
import { IconButton } from 'material-ui'
import DeleteIcon from 'material-ui-icons/Delete'
import FileDownload from 'material-ui-icons/FileDownload'
import Paper from 'material-ui/Paper'
import { getAttendances, removeAttendance, getAttendanceById } from '../../models/attendance'
import ExcelFile, { ExcelSheet, ExcelColumn } from 'react-data-export'
import { snapShotToArray } from '../../utils/firebase'

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
        this.getAllExportData(attendances)
      }
    })
  }

  handleRemove = (attendanceId) => {
    removeAttendance(attendanceId)
  }

  getExportData = async (attendanceId) => {
    const attendance = await getAttendanceById(attendanceId)
    const { date, period, students } = attendance
    const studentsToArray = snapShotToArray(students)

    const exportData = studentsToArray.map(student => {
      return {
        codigo: student.code,
        aluno: student.name,
        presente: student.present ? 'Sim' : 'Não',
        periodo: period,
        data: date
      }
    })

    return exportData
  }

  getAllExportData = async (attendances) => {
    await Promise.all(attendances.map(async (attendance) => {
      this.setState({
        [attendance.id]: await this.getExportData(attendance.id)
      })
    }))
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
            {attendances.map((attendance, index) => {
              return (
                <TableRow key={index}>
                  <TableCell>{attendance.date}</TableCell>
                  <TableCell>{attendance.period}</TableCell>
                  <TableCell>
                    <IconButton onClick={() => this.handleRemove(attendance.id)} aria-label='Delete'>
                      <DeleteIcon />
                    </IconButton>
                    <ExcelFile
                      filename={`chamada-${attendance.id}.xlsx`}
                      element={
                          <IconButton aria-label='Export'>
                            <FileDownload />
                          </IconButton>
                        }>
                      <ExcelSheet data={this.state[attendance.id]} name='chamada'>
                        <ExcelColumn label='Codigo' value='codigo' />
                        <ExcelColumn label='Aluno' value='aluno' />
                        <ExcelColumn label='Presente' value='presente' />
                        <ExcelColumn label='Periodo' value='periodo' />
                        <ExcelColumn label='Data' value='data' />
                      </ExcelSheet>
                    </ExcelFile>
                  </TableCell>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </Paper>
    )
  }
}

export default AttendanceList
