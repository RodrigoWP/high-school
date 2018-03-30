import * as firebase from 'firebase'
import config from './config'

const ATTENDANCE_STUDENT_REF_KEY = 'attendances_students'

export const initFirebase = () => {
  firebase.initializeApp(config)
}

export const getOrCreateRef = (key) => {
  return firebase.database().ref().child(key)
}

export const snapShotToArray = (snapshot) => {
  if (snapshot === null) return []

  const keys = Object.keys(snapshot)
  return keys.map(key => {
    return {
      ...snapshot[key]
    }
  })
}

//attendance-student TODO remove after
export const createAttendanceStudent = (attendanceStudent, key) => {
  const attendanceStudentRef = getOrCreateRef(`${ATTENDANCE_STUDENT_REF_KEY}/${key}`)
  attendanceStudentRef.set(attendanceStudent)
}

export const removeAttendanceStudent = (id) => {
  const attendanceStudentRef = getOrCreateRef(`${ATTENDANCE_STUDENT_REF_KEY}/${id}`)
  attendanceStudentRef.remove()
}

export const getAttendancesStudents = (callback) => {
  const attendanceStudentRef = getOrCreateRef(ATTENDANCE_STUDENT_REF_KEY)
  attendanceStudentRef.on('value', snap => {
    callback(snapShotToArray(snap.val()))
  })
}

export const clearAttendancesStudents = () => {
  const attendanceStudentRef = getOrCreateRef(ATTENDANCE_STUDENT_REF_KEY)
  attendanceStudentRef.remove()
}

export const updateAttendanceStudentToPresent = (studentCode) => {
  const attendanceStudentRef = getOrCreateRef(`${ATTENDANCE_STUDENT_REF_KEY}/${studentCode}/present`)
  attendanceStudentRef.set(true)
}

export const updateAllAttendanceStudentToNotPresent = (studentsCode) => {
  studentsCode.forEach(code => {
    const attendanceStudentRef = getOrCreateRef(`${ATTENDANCE_STUDENT_REF_KEY}/${code}/present`)
    attendanceStudentRef.set(false)
  })
}
