import * as React from 'react'
import { Typography } from '@material-ui/core'
import { Theme, WithStyles, withStyles } from '@material-ui/core/styles'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'
import CircularProgress from '@material-ui/core/CircularProgress'
import Button from '@material-ui/core/Button'
import { Done } from '@material-ui/icons'
import { Placement } from 'models/placement'
import { BetModalState } from '../../models/bet-modal-state'
import { BetButton } from '../bet-button'
import { Winner } from 'models/winner'

interface Props extends WithStyles<keyof ReturnType<typeof styles>> {
  state: BetModalState
  homeTeam: string
  awayTeam: string
  selectedBet: Placement
  fixtureStarted: boolean
  placeBet: (winner: Winner) => void
  onClose: () => void
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
        <Dialog
          open={
            this.props.state === BetModalState.Opened ||
            this.props.state === BetModalState.PlacingBet
          }
          onClose={() =>
            this.props.state === BetModalState.Opened && this.props.onClose()
          }
          aria-labelledby="form-dialog-title"
          fullWidth
        >
          <DialogTitle id="form-dialog-title">Place bet</DialogTitle>
          {this.props.fixtureStarted && (
            <Typography
              component="p"
              color="error"
              style={{ margin: '0 auto', paddingBottom: '20px' }}
            >
              The match has already started, a bet cannot be placed.
            </Typography>
          )}
          <DialogContent>
            <div
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                justifyContent: 'center'
              }}
            >
              <BetButton
                title={this.props.homeTeam}
                selected={this.props.selectedBet === Placement.Home}
                onClick={() => this.props.placeBet(Winner.Home)}
                disabled={
                  this.props.state === BetModalState.PlacingBet ||
                  this.props.fixtureStarted
                }
              />
              <BetButton
                title={this.props.awayTeam}
                selected={this.props.selectedBet === Placement.Away}
                onClick={() => this.props.placeBet(Winner.Away)}
                disabled={
                  this.props.state === BetModalState.PlacingBet ||
                  this.props.fixtureStarted
                }
              />
            </div>
          </DialogContent>
          {this.props.state === BetModalState.PlacingBet ? (
            <div style={{ paddingBottom: '20px', margin: '0 auto' }}>
              <CircularProgress size={75} />
            </div>
          ) : (
            <DialogActions>
              <Button onClick={this.props.onClose} color="primary">
                Close
              </Button>
            </DialogActions>
          )}
        </Dialog>
      )
    }
  }
)
