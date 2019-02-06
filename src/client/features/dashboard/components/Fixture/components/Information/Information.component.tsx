import React from 'react'
import styles from './Information.styles.scss'
import { DashboardFixture } from '@client/features/dashboard/models/dashboard-fixture'

interface Props {
  fixture: DashboardFixture
}

export function Information(props: Props) {
  const { fixture } = props
  const date = `${fixture.startDate} ${fixture.startTime}`

  return (
    <div className={styles.container}>
      <div className={styles.matchDate}>
        First match
        <div>{date}</div>
      </div>

      <div className={styles.divider} />

      <div className={styles.matchDate}>
        Second match
        <div>{date}</div>
      </div>
    </div>
  )
}
