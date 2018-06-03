import * as React from 'react'
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
import { Done, Clear } from '@material-ui/icons'
import green from '@material-ui/core/colors/green'
import { Placement } from 'models/placement'

interface Props extends StoreProps {}

export default class Component extends React.PureComponent<Props> {
  render() {
    console.log(this.props)
    return (
      <div
        style={{
          maxWidth: '1280px',
          padding: '20px',
          margin: '0 auto'
        }}
      >
        <Grid container spacing={16}>
          {this.props.stages.map((stage, index) => (
            <Grid key={index} item xs={12}>
              <Paper>
                <Toolbar>
                  <Typography variant="title" id="tableTitle">
                    {stage.name}
                  </Typography>
                </Toolbar>
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
                          style={{ width: '250px' }}
                        >
                          {fixture.home} - {fixture.away}
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
                  </TableBody>
                </Table>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </div>
    )
  }
}
