import { getOrCreateRef, snapShotToArray } from '../../utils/firebase'

const STUDENTS_REF_KEY = 'students'

export const createStudent = (student) => {
  const studentRef = getOrCreateRef(`${STUDENTS_REF_KEY}/${student.code}`)
  studentRef.set(student)
}

export const removeStudent = (code) => {
  const studentRef = getOrCreateRef(`${STUDENTS_REF_KEY}/${code}`)
  studentRef.remove()
}

export const getStudents = (callback) => {
  const studentRef = getOrCreateRef(STUDENTS_REF_KEY)

  if (callback) {
    studentRef.on('value', snap => {
      callback(snapShotToArray(snap.val()))
    })

    return
  }

  return new Promise((resolve, reject) => {
    studentRef.once('value', snap => {
      resolve(snapShotToArray(snap.val()))
    })
  })
}

export const getStudentByCode = (code) => {
  const studentRef = getOrCreateRef(`${STUDENTS_REF_KEY}/${code}`)

  return new Promise((resolve, reject) => {
    studentRef.once('value', snap => {
      resolve(snap.val())
    })
  })
}
