import React from 'react'
import styles from './Information.styles.scss'

interface Props {
  fixture: any
}

export function Information(props: Props) {
  const { fixture } = props

  return (
    <div className={styles.container}>
      <div className={styles.matchDate}>
        First match
        <div>{fixture.firstMatchStart}</div>
      </div>

      <div className={styles.divider} />

      <div className={styles.matchDate}>
        Second match
        <div>{fixture.secondMatchStart}</div>
      </div>
    </div>
  )
}
