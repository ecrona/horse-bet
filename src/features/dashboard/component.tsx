import * as React from 'react'
import { StoreProps } from './container'
import Grid from '@material-ui/core/Grid'

interface Props extends StoreProps {}

export default class Component extends React.PureComponent<Props> {
  render() {
    return (
      <div
        style={{
          maxWidth: '1280px',
          padding: '20px',
          margin: '0 auto'
        }}
      >
        <Grid container spacing={16}>
          <Grid item xs={6}>
            hej
          </Grid>
          <Grid item xs={6}>
            hej
          </Grid>
        </Grid>
      </div>
    )
  }
}
