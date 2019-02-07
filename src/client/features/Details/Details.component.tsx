import * as React from 'react'
import styles from './Details.styles.scss'
import { Toolbar } from '@client/shared/components/Toolbar/component'

// interface Props extends StoreProps {}
interface Props {}

export class Details extends React.PureComponent<Props> {
  render() {
    return (
      <React.Fragment>
        <Toolbar subtitle="Game details" canGoBack hideHighscore />
      </React.Fragment>
    )
  }
}
