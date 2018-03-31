import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { injectGlobal } from 'styled-components'
import Main from './screens'

injectGlobal`
  *, *::before, *::after {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  html,
  body,
  body {
    height: 100%;
    font-family: 'Nunito', sans-serif;
  }
`

const App = () => (
  <Router>
    <Switch>
      <Route path='/' component={Main} />
    </Switch>
</Router>
)

export default App
