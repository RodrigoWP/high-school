import React from 'react'
import Grid from 'material-ui/Grid'
import { TextField, Button } from 'material-ui'

const StudentForm = ({ onSubmit, student, onInputChange }) => (
  <form onSubmit={onSubmit}>
    <Grid container spacing={24}>
      <Grid item xs>
        <TextField
          label='Código'
          name='code'
          value={student.code}
          onChange={onInputChange}
          placeholder='Código de matrícula do aluno'
          fullWidth
          margin='normal'
          required
        />
      </Grid>
      <Grid item xs>
        <TextField
          label='Nome completo'
          name='name'
          value={student.name}
          onChange={onInputChange}
          placeholder='Nome completo do aluno'
          fullWidth
          margin='normal'
          required
        />
      </Grid>
    </Grid>
    <Grid container spacing={24}>
      <Grid item xs={12}>
        <Button
          type='submit'
          variant='raised'
          color='primary'>
          Cadastrar aluno
        </Button>
      </Grid>
    </Grid>
  </form>
)

export default StudentForm
