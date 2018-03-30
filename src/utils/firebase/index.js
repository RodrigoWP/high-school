import * as firebase from 'firebase'
import config from './config'

const STUDENTS_REF_KEY = 'students'
const ATTENDANCE_REF_KEY = 'attendances'
const ATTENDANCE_STUDENT_REF_KEY = 'attendances_students'

export const initFirebase = () => {
  firebase.initializeApp(config)
}

const getOrCreateRef = (key) => {
  return firebase.database().ref().child(key)
}

const snapShotToArray = (snapshot) => {
  if (snapshot === null) return []

  const keys = Object.keys(snapshot)
  return keys.map(key => {
    return {
      ...snapshot[key]
    }
  })
}

//students
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

//attendance
export const createAttendance = (data) => {
  const attendanceRef = getOrCreateRef(ATTENDANCE_REF_KEY).push()
  attendanceRef.set({
    id: attendanceRef.key,
    ...data
  })

  return attendanceRef.key
}

export const removeAttendance = (id) => {
  const attendanceRef = getOrCreateRef(`${ATTENDANCE_REF_KEY}/${id}`)
  attendanceRef.remove()
}

//attendance-student
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
