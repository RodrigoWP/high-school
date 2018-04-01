import React, { PureComponent } from 'react'
import StudentForm from './student-form'
import StudentList from './student-list'
import {
  getStudents,
  createStudent,
  removeStudent
} from '../../models/student'

class Student extends PureComponent {
  state = {
    student: {
      code: '',
      name: ''
    },
    students: []
  }

  componentDidMount () {
    const students = getStudents(
      (students) => this.setState({ students })
    )
  }

  handleSubmit = (e) => {
    e.preventDefault()

    this.save()
  }

  save = () => {
    const { student } = this.state

    createStudent(student)

    this.clearFields()
  }

  remove = (code) => {
    removeStudent(code)
  }

  clearFields = () => {
    this.setState({
      student: {
        code: '',
        name: ''
      }
    })
  }

  handleInputChange = (e) => {
    const { name, value } = e.target

    this.setState(state => ({
      student: {
        ...state.student,
        [name]: value
      }
    }))
  }

  render () {
    const { student, students } = this.state

    return (
      <React.Fragment>
        <StudentForm
          student={student}
          onInputChange={this.handleInputChange}
          onSubmit={this.handleSubmit}
        />
        <br />
        <h2>Alunos</h2>
        <StudentList
          students={students}
          onClickRemove={this.remove}
        />
      </React.Fragment>
    )
  }
}

export default Student
