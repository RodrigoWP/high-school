import React from 'react'
import ReactDOM from 'react-dom'
import App from './app'
import { initFirebase } from './utils/firebase'

initFirebase()

ReactDOM.render(<App />, document.getElementById('root'))
