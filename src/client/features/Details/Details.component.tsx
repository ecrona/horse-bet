import * as React from 'react'
import styles from './Details.styles.scss'

import 'shared/components/horse-button'

// interface Props extends StoreProps {}
interface Props {}

export class Details extends React.PureComponent<Props> {
  render() {
    return <div className={styles.container} />
  }
}
