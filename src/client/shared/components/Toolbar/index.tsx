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

export default function Toolbar({ subtitle }: Props) {
  return (
    <div className="toolbar__container">
      <div className="toolbar">
        <Link to="/">
          <span className="toolbar__icon">
            <IconButton aria-label="Highscore" color="inherit">
              <ArrowBack />
            </IconButton>
          </span>
        </Link>

        <div>
          <span className="toolbar__title">Hästbett</span>

          {subtitle && <span className={styles.subtitle}>{subtitle}</span>}
        </div>

        <div>
          <Link to="/highscore" title="View highscore">
            <span className="toolbar__icon">
              <IconButton aria-label="Highscore" color="inherit">
                <FormatListNumberedIcon />
              </IconButton>
            </span>
          </Link>
        </div>
      </div>
    </div>
  )
}
