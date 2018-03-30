import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const MenuContainer = styled.div`
  display: flex;
`

const Menu = ({ children, className, style }) => (
  <MenuContainer className={className} style={style}>
    {children}
  </MenuContainer>
)

Menu.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  style: PropTypes.object
}

export { MenuItem } from './menu-item'
export default Menu
