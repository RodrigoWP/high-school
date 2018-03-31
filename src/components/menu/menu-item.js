import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const StyledItem = styled.div`
  &:not(:first-child) {
    padding-left: 55px;
  }

  &:not(:last-child) {
    padding-right: 55px;
  }

  > span, a > span {
    color: #6d87a6;
    text-transform: uppercase;
    font-weight: 700;
    cursor: pointer;

    &:hover {
      color: #4f647d;
    }
  }

  > a {
    text-decoration: none;
  }
`

const MenuItem = ({ children }) => (
  <StyledItem>
   {children}
  </StyledItem>
)

MenuItem.propTypes = {
  children: PropTypes.node
}

export { MenuItem }
