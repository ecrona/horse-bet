import React from 'react'
import classnames from 'classnames'
import { Toolbar } from '@client/shared/components/Toolbar/component'
import styles from './Highscore.styles.scss'

const users = [
  {
    name: 'Eddan Baduba'
  },
  {
    name: 'Geppan Halåba'
  },
  {
    name: 'Dirre Firre'
  },
  {
    name: 'Larre Karre'
  },
  {
    name: 'Sparre Poster'
  },
  {
    name: 'Limpan Slaktman'
  },
  {
    name: 'Adam Kristbert'
  },
  {
    name: 'Manus Julian'
  },
  {
    name: 'KC Cronason'
  },
  {
    name: 'Spendrups Österberg'
  }
]

export class Highscore extends React.PureComponent {
  render() {
    return (
      <React.Fragment>
        <Toolbar subtitle="Highscore" canGoBack hideHighscore />

        <div className={styles.spacing} />

        <div className={classnames(styles.item, styles.self)}>
          <span className={styles.rank}>100</span>
          <span className={styles.name}>
            Viktor Kleto{' '}
            <span style={{ color: 'rgba(255,255,255,0.75)' }}>(Me)</span>
          </span>
        </div>

        {users.map((user, index) => (
          <div key={user.name} className={styles.item}>
            <span className={styles.rank}>{index + 1}</span>
            <span className={styles.name}>{user.name}</span>
          </div>
        ))}
      </React.Fragment>
    )
  }
}
