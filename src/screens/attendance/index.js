import React, { PureComponent } from 'react'
import Blankslate from './blankslate'
import PeriodForm from './period-form'
import AttendanceForm from './attendance-form'

class Attendance extends PureComponent {
  state = {
    showPeriodForm: false,
    attendanceStarted: false
  }

  showPeriodForm = () => {
    this.setState({
      showPeriodForm: true
    })
  }

  hidePeriodForm = () => {
    this.setState({
      showPeriodForm: false
    })
  }

  onSelectPeriod = (period) => {
    console.log('period selected: ', period)

    this.startAttendance()
    this.hidePeriodForm()
  }

  startAttendance = () => {
    this.setState({
      attendanceStarted: true
    })
  }

  stopAttendance = () => {
    this.setState({
      attendanceStarted: false
    })
  }

  render () {
    const { showPeriodForm, attendanceStarted } = this.state

    return (
      <React.Fragment>
        {!attendanceStarted
          ? <Blankslate
              onNewAttendance={this.showPeriodForm}
            />
          : <AttendanceForm
              onStop={this.stopAttendance}
            />
        }

        <PeriodForm
          open={showPeriodForm}
          onCloseForm={this.hidePeriodForm}
          onSelectPeriod={this.onSelectPeriod}
        />
      </React.Fragment>
    )
  }
}

export default Attendance
