import * as React from 'react'
import { Theme, WithStyles, withStyles } from '@material-ui/core/styles'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import Button from '@material-ui/core/Button'
import { Done } from '@material-ui/icons'

interface Props extends WithStyles<keyof ReturnType<typeof styles>> {
  title: string
  selected?: boolean
  disabled?: boolean
  onClick: () => void
}

const styles = (theme: Theme) => ({
  button: {
    minWidth: '180px',
    margin: theme.spacing.unit
  },
  icon: {
    marginRight: theme.spacing.unit
  }
})

export default withStyles(styles)(
  class Component extends React.PureComponent<Props> {
    render() {
      return (
        <Button
          onClick={this.props.onClick}
          variant="raised"
          color="default"
          disabled={this.props.disabled}
          className={this.props.classes.button}
        >
          {this.props.selected && <Done className={this.props.classes.icon} />}
          {this.props.title}
        </Button>
      )
    }
  }
)
