import { expect } from 'chai'
import { getStudentsNotPresent } from './index'

describe('attendance model tests', () => {
  it('should get only studends not presents', () => {
    const students = [
      {
        code: 1,
        name: 'Marcel'
      },
      {
        code: 2,
        name: 'Rodrigo'
      },
      {
        code: 3,
        name: 'Marcus'
      },
      {
        code: 4,
        name: 'Vinicius'
      }
    ]

    const studentsPresent = [
      {
        code: 1,
        name: 'Marcel'
      },
      {
        code: 3,
        name: 'Marcus'
      }
    ]

    const result = [
      {
        code: 2,
        name: 'Rodrigo'
      },
      {
        code: 4,
        name: 'Vinicius'
      }
    ]

    expect(getStudentsNotPresent(students, studentsPresent)).to.be.deep.equal(result)
  })
})
