import React from 'react'
import PropTypes from 'prop-types'
import { Typography, Button } from 'material-ui'
import styled from 'styled-components'

const StyledBlankslate = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  .title {
    display: flex;
    align-items: center;
    flex-direction: column;
  }
`

const Blankslate = ({ onNewAttendance }) => (
  <StyledBlankslate>
    <div className='title'>
      <Typography variant='title'>
        Nenhuma chamada feita para este dia
      </Typography>
      <Typography variant='subheading'>
        Deseja iniciar uma nova chamada?
      </Typography>
    </div>
    <Button
      variant='raised'
      color='primary'
      onClick={onNewAttendance}
      style={{ marginTop: '20px' }}>
      Iniciar nova chamada
    </Button>
  </StyledBlankslate>
)

Blankslate.propTypes = {
  onNewAttendance: PropTypes.func.isRequired
}

export default Blankslate
