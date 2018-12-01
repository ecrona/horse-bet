import React from 'react'
import { Button } from 'shared/components/Button/component'
import styles from './styles.scss'

export class Fixture extends React.PureComponent {
  render() {
    return (
      <div className={styles.root}>
        <div className={styles.team}>
          <Button style={{ flex: 1, marginRight: 8 }}>Liverpool</Button>
          <img
            src="assets/logotypes/liverpool.png"
            className={styles.logotype}
          />
        </div>

        <span className={styles.details}>19:00</span>

        <div className={styles.team}>
          <img src="assets/logotypes/bayern.png" className={styles.logotype} />
          <Button style={{ flex: 1, marginLeft: 8 }}>Bayern Munich</Button>
        </div>
      </div>
    )
  }
}
