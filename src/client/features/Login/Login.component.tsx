import * as React from 'react'
import styles from './Login.styles.scss'

// interface Props extends StoreProps {}
interface Props {}

export class Login extends React.PureComponent<
  { show: boolean },
  { transition: boolean }
> {
  state = { transition: false }

  /*
    Make it spin while logging in?
  */

  render() {
    return (
      <div className={styles.container}>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            height: '180px',
            width: '180px',
            margin: '20px auto 40px',
            background: '#fff',
            boxShadow: '0px 2px 10px 4px #fdfdfd',
            borderRadius: '100%',
            fontFamily: 'Segoe Print',
            fontSize: '24px',
            transform: this.state.transition
              ? 'rotate(8000deg)'
              : 'rotate(0deg)',
            transition: 'transform 20s linear'
          }}
        >
          <img style={{ height: '100px' }} src="/assets/logotypes/logo.png" />
          <span>Hästbett</span>
        </div>

        <div>
          <a href="/auth/google">Log in</a>
        </div>
      </div>
    )
  }
}
