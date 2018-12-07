import React from 'react'
import { Link } from 'react-router-dom'
import IconButton from '@material-ui/core/IconButton'
import FormatListNumberedIcon from '@material-ui/icons/FormatListNumbered'
import ArrowBack from '@material-ui/icons/ArrowBack'
import styles from './styles.scss'

interface Props {
  canGoBack?: boolean
  hideHighscore?: boolean
  subtitle?: string
}

export class Toolbar extends React.PureComponent<Props> {
  render() {
    return (
      <div className={styles.root}>
        <div className={styles.left}>
          {this.props.canGoBack && (
            <Link to="/">
              <span className={styles.icon}>
                <IconButton aria-label="Highscore" color="inherit">
                  <ArrowBack />
                </IconButton>
              </span>
            </Link>
          )}
        </div>

        <span className={styles.center}>
          <span className={styles.title}>Horse bet</span>

          {this.props.subtitle && (
            <span className={styles.subtitle}>{this.props.subtitle}</span>
          )}
        </span>

        <div className={styles.right}>
          {!this.props.hideHighscore && (
            <Link to="/highscore">
              <span className={styles.icon}>
                <IconButton aria-label="Highscore" color="inherit">
                  <FormatListNumberedIcon />
                </IconButton>
              </span>
            </Link>
          )}
        </div>
      </div>
    )
  }
}
