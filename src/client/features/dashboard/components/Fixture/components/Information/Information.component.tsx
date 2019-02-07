import React from 'react'
import styles from './Information.styles.scss'
import { DashboardFixture } from '@client/features/Dashboard/models/dashboard-fixture'

interface Props {
  fixture: DashboardFixture
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
