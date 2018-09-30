import * as React from 'react'
import { Card, Button, CardContent, Typography } from '@material-ui/core'
import { StoreProps } from './container'
import { LoginMethod } from './models/login-method'
import { AuthenticationError } from 'models/authentication-error'

interface Props extends StoreProps {}

export class Login extends React.PureComponent<Props> {
  public get errorMessage() {
    switch (this.props.error) {
      case AuthenticationError.Unauthorized:
        return 'Your email is not valid'
      case AuthenticationError.None:
      default:
        return ''
    }
  }

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
          <Typography component="p" color="error">
            {this.errorMessage}
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
