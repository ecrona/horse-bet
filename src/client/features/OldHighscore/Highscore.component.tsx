import Toolbar from '@client/shared/components/Toolbar'
import CircularProgress from '@material-ui/core/CircularProgress'
import clsx from 'clsx'
import React from 'react'
import { StoreProps } from './Highscore.container'
import styles from './Highscore.styles.scss'
import { ViewState } from './models/view-state'

interface Props extends StoreProps { }

export class Highscore extends React.PureComponent<Props> {
  componentDidMount() {
    this.props.fetchHighscores()
  }

  render() {
    const { viewState, highscores, myHighscore } = this.props

    return (
      <React.Fragment>
        <Toolbar subtitle="Highscore" hideHighscore />

        {viewState === ViewState.Fetching && (
          <div className={styles.loader}>
            <CircularProgress size={56} />
          </div>
        )}

        {viewState === ViewState.Highscores && (
          <React.Fragment>
            <div className={styles.spacing} />

            {highscores.map(highscore => (
              <div
                key={highscore.name}
                className={clsx({
                  [styles.item]: true,
                  [styles.me]: highscore.me
                })}
              >
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
