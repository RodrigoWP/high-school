import React, { PureComponent } from 'react'
import Paper from 'material-ui/Paper'
import Tabs, { Tab } from 'material-ui/Tabs'
import Blankslate from './blankslate'
import PeriodForm from './period-form'
import AttendanceForm from './attendance-form'
import AttendanceList from './attendance-list'
import {
  createAttendance,
  removeAttendance
} from '../../models/attendance'

class Attendance extends PureComponent {
  state = {
    showPeriodForm: false,
    hasCurrentAttendance: false,
    attendanceId: null,
    currentTab: 0
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
    this.startAttendance(period)
    this.hidePeriodForm()
  }

  startAttendance = (period) => {
    const attendanceId = createAttendance(period)

    this.setState({
      attendanceId,
      hasCurrentAttendance: true
    })
  }

  stopAttendance = () => {
    removeAttendance(this.state.attendanceId)
    this.setState({ hasCurrentAttendance: false })
  }

  handleChangeTab = (event, value) => {
    this.setState({ currentTab: value })
  }

  render () {
    const { currentTab, showPeriodForm, hasCurrentAttendance } = this.state

    return (
      <React.Fragment>
        <Paper>
          <Tabs
            value={currentTab}
            onChange={this.handleChangeTab}
            indicatorColor='primary'
            textColor='primary'
            centered>
            <Tab label='Chamada do dia' />
            <Tab label='Lista de chamadas' />
          </Tabs>
        </Paper>
        {currentTab === 0 &&
          (
            hasCurrentAttendance
              ? <Blankslate
                  onNewAttendance={this.showPeriodForm}
                />
              : <AttendanceForm
                  onStop={this.stopAttendance}
                />
            )
        }
        {currentTab === 1 &&
          <AttendanceList />
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
