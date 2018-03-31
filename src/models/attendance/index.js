import { getOrCreateRef, snapShotToArray } from '../../utils/firebase'
import moment from 'moment'
import { getStudents } from '../student'

const ATTENDANCE_REF_KEY = 'attendances'

export const createAttendance = (period) => {
  const currentDate = moment(new Date()).format('DD/MM/YYYY')
  const attendanceRef = getOrCreateRef(ATTENDANCE_REF_KEY).push()

  attendanceRef.set({
    id: attendanceRef.key,
    date: currentDate,
    period: period
  })

  return attendanceRef.key
}

export const removeAttendance = (attendanceId) => {
  const attendanceRef = getOrCreateRef(`${ATTENDANCE_REF_KEY}/${attendanceId}`)

  attendanceRef.remove()
}

export const getAttendances = (callback) => {
  const attendanceRef = getOrCreateRef(ATTENDANCE_REF_KEY)

  attendanceRef.on('value', snap => {
    callback(snapShotToArray(snap.val()))
  })
}

export const createStudentRegister = async (attendanceId, student) => {
  if (student) {
    createStudentAttendance(student, true)

    return
  }

  const students = await getStudents()
  console.log('students: ', students)
  const studentsPresents = await getStudentsAttendance()
  console.log('studentsPresents: ', studentsPresents)
  const studentsNotPresent = getStudentsNotPresent(students, studentsPresents)

  console.log('studentsNotPresent: ', studentsNotPresent)

  studentsNotPresent.map(student => {
    createStudentAttendance(student, false)
  })
}

export const getStudentsAttendance = () => {
  const ref = getOrCreateRef(`${ATTENDANCE_REF_KEY}/${'-L8xMYySJebzi9sVEDm8'}/students`)

  return new Promise((resolve, reject) => {
    ref.once('value', snap => {
      resolve(snapShotToArray(snap.val()))
    })
  })
}

const createStudentAttendance = (student, present) => {
  const { code, name } = student
  const ref = getOrCreateRef(`${ATTENDANCE_REF_KEY}/${'-L8xMYySJebzi9sVEDm8'}/students/${code}`)

  ref.set({ code, name, present })
}

export const getStudentsNotPresent = (students, studentsPresent) => {
  let studentsNotPresent = []

  students.forEach(student => {
    const isPresent = studentsPresent.some(sp => sp.code === student.code)

    if(!isPresent) {
      studentsNotPresent.push(student)
    }
  })

  return studentsNotPresent
}
