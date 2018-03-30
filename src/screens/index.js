import React, { PureComponent } from 'react'
import { Switch, Route, Link } from 'react-router-dom'
import Layout, { Header, NavBar, Content } from '../components/layout'
import Menu, { MenuItem } from '../components/menu'
import Student from './student'
import Attendance from './attendance'

class Main extends PureComponent {

  render () {
    return (
      <Layout>
        <Header>

        </Header>
        <NavBar>
          <Menu>
            <MenuItem>
              <Link to='/'>
                <span>chamada</span>
              </Link>
            </MenuItem>
            <MenuItem>
              <Link to='/students'>
                <span>aluno</span>
              </Link>
            </MenuItem>
          </Menu>
        </NavBar>
        <Content>
          <Switch>
            <Route exact path='/' component={Attendance} />
            <Route path='/students' component={Student} />
          </Switch>
        </Content>
      </Layout>
    )
  }
}

export default Main
