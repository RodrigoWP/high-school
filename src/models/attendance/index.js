import { getOrCreateRef } from '../../utils/firebase'
import moment from 'moment'

const ATTENDANCE_REF_KEY = 'attendances'

const snapShotToArray = (snapshot) => {
  if (snapshot === null) return []

  const keys = Object.keys(snapshot)
  return keys.map(key => {
    return {
      ...snapshot[key]
    }
  })
}

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

export const getCurrentAttendance = () => {

}
