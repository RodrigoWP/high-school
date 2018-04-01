import React, { PureComponent } from 'react'
import Paper from 'material-ui/Paper'
import Tabs, { Tab } from 'material-ui/Tabs'
import Blankslate from './blankslate'
import PeriodForm from './period-form'
import AttendanceForm from './attendance-form'
import AttendanceList from './attendance-list'
import {
  createAttendance,
  getCurrentAttendance
} from '../../models/attendance'

class Attendance extends PureComponent {
  state = {
    showPeriodForm: false,
    attendanceId: null,
    currentTab: 0
  }

  componentDidMount () {
    this.refreshCurrentAttendance()
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

    this.setState({ attendanceId })
  }

  handleChangeTab = (event, currentTab) => {
    this.setState({ currentTab })
    this.shouldUpdateCurrentAttendance(currentTab)
  }

  shouldUpdateCurrentAttendance = (currentTab) => {
    const isAttendanceTab = currentTab === 0
    if (isAttendanceTab) {
      this.refreshCurrentAttendance()
    }
  }

  refreshCurrentAttendance = async () => {
    const currentAttendance = await getCurrentAttendance()

    if (currentAttendance === null) {
      this.setState({
        attendanceId: null
      })

      return
    }

    this.setState({
      attendanceId: currentAttendance.id
    })
  }

  render () {
    const { currentTab, showPeriodForm, attendanceId } = this.state
    const hasCurrentAttendance = attendanceId !== null

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
            !hasCurrentAttendance
              ? <Blankslate
                  onNewAttendance={this.showPeriodForm}
                />
              : <AttendanceForm
                  attendanceId={attendanceId}
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
