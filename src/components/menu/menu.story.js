import React from 'react'
import { storiesOf } from '@storybook/react'
import Menu, { MenuItem } from './index'

const stories = storiesOf('menu', module)

stories.add('basic menu', () => (
  <Menu>
    <MenuItem label='dashboard' />
    <MenuItem label='reports' />
    <MenuItem label='help' />
    <MenuItem label='account' />
  </Menu>
))
