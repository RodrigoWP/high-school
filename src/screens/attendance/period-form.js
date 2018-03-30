import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import Dialog, {
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from 'material-ui/Dialog'
import Select from 'material-ui/Select'
import { MenuItem } from 'material-ui/Menu'
import { Button } from 'material-ui'

class PeriodForm extends PureComponent {
  state = {
    periodValue: 'vespertino'
  }

  handleChange = (e) => {
    const { value } = e.target

    this.setState({
      periodValue: value
    })
  }

  render () {
    const { periodValue } = this.state
    const { onCloseForm, onSelectPeriod, open } = this.props

    return (
      <Dialog
        open={open}
        onClose={onCloseForm}>
        <DialogTitle>Informe o periodo</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Qual periodo que deseja fazer a chamada?
          </DialogContentText>
          <Select
            value={periodValue}
            onChange={this.handleChange}
            fullWidth>
            <MenuItem value='vespertino'>vespertino</MenuItem>
            <MenuItem value='noturno'>noturno</MenuItem>
          </Select>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={onCloseForm}
            color='primary'>
            Cancelar
          </Button>
          <Button
            onClick={() => onSelectPeriod(periodValue)}
            color='primary'>
            Continuar
          </Button>
        </DialogActions>
      </Dialog>
    )
  }
}

PeriodForm.propTypes = {
  onSelectPeriod: PropTypes.func.isRequired,
  onCloseForm: PropTypes.func.isRequired,
  open: PropTypes.bool
}

export default PeriodForm
