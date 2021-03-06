import React from 'react'
import styled from 'styled-components'

const StyledContent = styled.div`
  background-color: #f5f5f5;
  padding: 10px 30px 30px 30px;
  overflow-x: hidden;
  overflow-y: auto;
  height: calc(100% - 200px);
  position: relative;
  top: 200px;
  z-index: 4;
`

const Content = ({ children, className, style }) => (
  <StyledContent
    className={className}
    style={style}>
    {children}
  </StyledContent>
)

export { Content }