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

export const getStudents = (callback, once) => {
  const studentRef = getOrCreateRef(STUDENTS_REF_KEY)
  if (once) {
    studentRef.once('value', snap => {
      callback(snapShotToArray(snap.val()))
    })

    return
  }

  studentRef.on('value', snap => {
    callback(snapShotToArray(snap.val()))
  })
}
