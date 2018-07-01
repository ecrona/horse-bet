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
import { Edit, Done, Timer } from '@material-ui/icons'
import green from '@material-ui/core/colors/green'
import { Placement } from 'models/placement'
import { Winner } from 'models/winner'
import { BetModal } from './components/bet-modal'
import { HighScoreModal } from './components/high-score-modal'
import { WithStyles, Theme, withStyles, Button } from '@material-ui/core'

const iso3166 = require('iso-3166-2')

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
}) => {
  const icon = require(`svg-country-flags/svg/${
    title !== 'England' ? iso3166.country(title).code.toLowerCase() : 'gb-eng'
  }.svg`) as string

  return (
    <span
      style={{
        display: 'flex',
        alignItems: 'center',
        minHeight: '30px',
        fontWeight: selected ? 600 : 500,
        textDecoration: selected ? 'underline' : 'none'
      }}
    >
      <img
        src={icon}
        style={{
          width: 30,
          height: 20,
          marginRight: 16,
          boxShadow: '0 1px 1px rgba(0,0,0,0.16), 0 1px 3px rgba(0,0,0,0.23)'
        }}
      />
      {title}
    </span>
  )
}

export default withStyles(styles)(
  class Component extends React.PureComponent<Props, State> {
    public state = {
      showHighScore: false
    }

    render() {
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
                              />
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
                                  <Timer color="disabled" />
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
            fixtureStarted={this.props.selectedFixtureStarted}
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
