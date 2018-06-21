import * as React from 'react'
import { StoreProps } from './container'
import { Card, Button, CardContent, Typography } from '@material-ui/core'
import { LoginMethod } from './models/login-method'

interface Props extends StoreProps {
  login: (method: LoginMethod) => void
}

export default class Component extends React.PureComponent<Props> {
  render() {
    return (
      <Card
        style={{
          margin: '0 auto',
          maxWidth: '300px',
          textAlign: 'center'
        }}
      >
        <CardContent>
          <Typography gutterBottom variant="headline" component="h2">
            Sign in
          </Typography>
          <Button
            onClick={() => this.props.login(LoginMethod.Google)}
            variant="contained"
            color="primary"
          >
            with Google
          </Button>
        </CardContent>
      </Card>
    )
  }
}
