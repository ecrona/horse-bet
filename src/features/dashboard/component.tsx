import * as React from 'react'
import bind from 'bind-decorator'
import { StoreProps } from './container'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import { Edit, Done, Clear } from '@material-ui/icons'
import green from '@material-ui/core/colors/green'
import { Placement } from 'models/placement'
import { Winner } from 'models/winner'
import { BetModal } from './components/bet-modal'
import { HighScoreModal } from './components/high-score-modal'
import { WithStyles, Theme, withStyles, Button } from '@material-ui/core'

interface Props
  extends StoreProps,
    WithStyles<keyof ReturnType<typeof styles>> {}

interface State {
  showHighScore: boolean
}

const styles = (theme: Theme) => ({
  tableWrapper: {
    overflow: 'auto',
    '& th:first-child': {
      minWidth: '225px'
    }
  }
})

const TeamTitle = ({
  title,
  selected
}: {
  title: string
  selected: boolean
}) => (
  <span
    style={{
      textDecoration: selected ? 'underline' : 'none'
    }}
  >
    {title}
  </span>
)

export default withStyles(styles)(
  class Component extends React.PureComponent<Props, State> {
    public state = {
      showHighScore: true
    }

    render() {
      console.log(this.props.totalScores)
      return (
        <div
          style={{
            maxWidth: '1280px',
            padding: '20px',
            margin: '0 auto'
          }}
        >
          <div style={{ marginBottom: 24, textAlign: 'center' }}>
            <Button
              variant="raised"
              onClick={() => this.setState(() => ({ showHighScore: true }))}
            >
              Show highscores
            </Button>
          </div>

          <Grid container spacing={16}>
            {this.props.stages.map((stage, index) => (
              <Grid key={index} item xs={12}>
                <Paper>
                  <Toolbar>
                    <Typography variant="title" id="tableTitle">
                      {stage.name}
                    </Typography>
                  </Toolbar>
                  <div className={this.props.classes.tableWrapper}>
                    <Table>
                      <TableHead>
                        <TableRow>
                          <TableCell>Match</TableCell>
                          {this.props.users.map((user, index) => (
                            <TableCell key={index}>{user.name}</TableCell>
                          ))}
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {stage.fixtures.map((fixture, index) => (
                          <TableRow key={index}>
                            <TableCell
                              component="th"
                              scope="row"
                              style={{ width: '250px', cursor: 'pointer' }}
                              onClick={() => this.props.openBetModal(fixture)}
                            >
                              <TeamTitle
                                title={fixture.home}
                                selected={fixture.winner === Winner.Home}
                              />{' '}
                              -{' '}
                              <TeamTitle
                                title={fixture.away}
                                selected={fixture.winner === Winner.Away}
                              />
                            </TableCell>
                            {fixture.placements.map((placement, index) => (
                              <TableCell key={index} style={{ width: '150px' }}>
                                {placement === Placement.Home && fixture.home}
                                {placement === Placement.Away && fixture.away}
                                {placement === Placement.NotPlaced && (
                                  <Clear color="secondary" />
                                )}
                                {placement === Placement.Placed && (
                                  <Done color="primary" />
                                )}
                              </TableCell>
                            ))}
                          </TableRow>
                        ))}
                        <TableRow key={index}>
                          <TableCell component="th" scope="row">
                            <i>Score</i>
                          </TableCell>
                          {stage.scores.map((score, index) => (
                            <TableCell key={index} style={{ width: '150px' }}>
                              {score}/{stage.fixtures.length}
                            </TableCell>
                          ))}
                        </TableRow>
                      </TableBody>
                    </Table>
                  </div>
                </Paper>
              </Grid>
            ))}
          </Grid>
          <BetModal
            state={this.props.betModalState}
            homeTeam={this.props.selectedFixture.home}
            awayTeam={this.props.selectedFixture.away}
            selectedBet={this.props.selectedBet}
            placeBet={(winner: Winner) =>
              this.props.placeBet(this.props.selectedFixture, winner)
            }
            onClose={this.props.closeBetModal}
          />
          <HighScoreModal
            open={this.state.showHighScore}
            score={this.props.totalScores}
            onClose={() => this.setState(() => ({ showHighScore: false }))}
          />
        </div>
      )
    }
  }
)
