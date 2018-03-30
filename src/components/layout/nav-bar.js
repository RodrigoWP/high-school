import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const StyledNavbar = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #ffffff;
  position: absolute;
  top: 70px;
  left: 0;
  height: 130px;
  width: 100%;
  padding: 0 40px 0 40px;
`

const NavBar = ({ children, style }) => (
  <StyledNavbar>
    {children}
  </StyledNavbar>
)

NavBar.propTypes = {
  children: PropTypes.node,
  collapsed: PropTypes.bool,
  style: PropTypes.object
}

export { NavBar }
