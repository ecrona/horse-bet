import React from 'react'
import classnames from 'classnames'
import { Toolbar } from '@client/shared/components/Toolbar/component'
import styles from './Highscore.styles.scss'
import { StoreProps } from './Highscore.container'
import { ViewState } from './models/view-state'

interface Props extends StoreProps {}

export class Highscore extends React.PureComponent<Props> {
  componentDidMount() {
    this.props.fetchHighscores()
  }

  render() {
    const { viewState, highscores, myHighscore } = this.props

    return (
      <React.Fragment>
        <Toolbar subtitle="Highscore" canGoBack hideHighscore />

        {viewState === ViewState.Fetching && (
          <span style={{ color: 'salmon' }}>Fetching your moma</span>
        )}

        {viewState === ViewState.Highscores && (
          <React.Fragment>
            <div className={styles.spacing} />

            <div className={classnames(styles.item, styles.self)}>
              <span className={styles.rank}>{myHighscore.rank}</span>
              <span className={styles.name}>
                {myHighscore.name} ({myHighscore.score}){' '}
                <span style={{ color: 'rgba(255,255,255,0.75)' }}>(Me)</span>
              </span>
            </div>

            {highscores.map(highscore => (
              <div key={highscore.name} className={styles.item}>
                <span className={styles.rank}>{highscore.rank}</span>
                <span className={styles.name}>
                  {highscore.name} ({highscore.score} rätt)
                </span>
              </div>
            ))}
          </React.Fragment>
        )}
      </React.Fragment>
    )
  }
}
