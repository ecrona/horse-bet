import * as React from 'react'
import { Theme, WithStyles, withStyles } from '@material-ui/core/styles'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import Button from '@material-ui/core/Button'
import { ListItemSecondaryAction } from '../../../../../node_modules/@material-ui/core'
import { Score } from '../../models/score'

interface Props {
  open: boolean
  score: Score[]
  onClose: () => void
}

export default class Component extends React.PureComponent<Props> {
  render() {
    return (
      <Dialog
        open={this.props.open}
        onClose={this.props.onClose}
        aria-labelledby="form-dialog-title"
        maxWidth="xs"
        fullWidth
      >
        <DialogTitle id="form-dialog-title">High Score</DialogTitle>
        <DialogContent>
          <List>
            {this.props.score.map((score, i: number) => (
              <ListItem key={i}>
                <ListItemText primary={score.name} />
                <ListItemSecondaryAction>{score.score}</ListItemSecondaryAction>
              </ListItem>
            ))}
          </List>
        </DialogContent>
        <DialogActions>
          <Button onClick={this.props.onClose} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    )
  }
}
