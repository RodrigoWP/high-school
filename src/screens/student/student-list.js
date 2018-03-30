import React from 'react'
import Table, { TableBody, TableCell, TableHead, TableRow } from 'material-ui/Table'
import { IconButton } from 'material-ui'
import DeleteIcon from 'material-ui-icons/Delete'
import Paper from 'material-ui/Paper'

const StudentList = ({ students, onClickRemove }) => (
  <Paper>
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>Código</TableCell>
          <TableCell>Nome completo</TableCell>
          <TableCell padding='checkbox'></TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {students.map(student => (
          <TableRow key={student.code}>
            <TableCell>{student.code}</TableCell>
            <TableCell>{student.name}</TableCell>
            <TableCell padding='checkbox'>
              <IconButton onClick={() => onClickRemove(student.code)} aria-label='Delete'>
                <DeleteIcon />
              </IconButton>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </Paper>
)

export default StudentList
