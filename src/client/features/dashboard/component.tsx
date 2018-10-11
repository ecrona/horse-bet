import * as React from 'react'
import bind from 'bind-decorator'
import { StoreProps } from './container'
import { WithStyles, Theme, withStyles, Button } from '@material-ui/core'

interface Props
  extends StoreProps,
    WithStyles<keyof ReturnType<typeof styles>> {}

const styles = (theme: Theme) => ({
  tableWrapper: {
    "overflow": 'auto',
    '& th:first-child': {
      minWidth: '175px'
    }
  }
})

export const Dashboard = withStyles(styles)(
  class Component extends React.PureComponent<Props> {
    componentDidMount() {
      this.props.getData()
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
          {this.props.rounds.length &&
            this.props.rounds[0].matchDays[0].days[0].fixtures[0].homeTeam.name}
        </div>
      )
    }
  }
)
