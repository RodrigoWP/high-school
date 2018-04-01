import moment from 'moment'

export const currentDate = new Date()

export const getCurrentDateUndescore = () => {
  return moment(currentDate).format('DD_MM_YYYY')
}

export const getCurrentDateFormatted = () => {
  return moment(currentDate).format('DD/MM/YYYY')
}
