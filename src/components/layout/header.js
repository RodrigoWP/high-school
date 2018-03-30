import React from 'react'
import styled from 'styled-components'
import { AppBar, Typography } from 'material-ui'
import { black, white } from '../../utils/colors'

const StyledHeader = styled.div`
  background-color: ${white};
  position: absolute;
  width: 100%;
  height: 70px;
  display: flex;
  align-items: center;
  top: 0;
  left: 0;
  box-shadow: 0 1px 23px rgba(0, 0, 0, 0.10), 0 1px 3px rgba(0,0,0,0);
  z-index: 5;

  .app-bar {
    background-color: ${black};
    position: absolute;
    top: 0;
    height: 100%;
  }
`

const Header = ({ children, className, style }) => (
  <StyledHeader
    className={className}
    style={style}>
    <AppBar className='app-bar'>
    </AppBar>
    {children}
  </StyledHeader>
)

export { Header }