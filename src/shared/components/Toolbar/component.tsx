import * as React from 'react'
import styles from './styles.scss'

interface Props {
  classes?: any
}

export class Toolbar extends React.PureComponent<Props> {
  render() {
    return (
      <div className={styles.root}>
        <span className={styles.title}>Horse bet</span>
      </div>
    )
  }
}
