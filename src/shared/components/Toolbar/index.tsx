import IconButton from '@material-ui/core/IconButton'
import ArrowBack from '@material-ui/icons/ArrowBack'
import FormatListNumberedIcon from '@material-ui/icons/FormatListNumbered'
import React from 'react'
import { Link, useHistory, useParams } from 'react-router-dom'
import styles from './styles.module.css'

interface Props {
  hideGoBack?: boolean
  hideHighscore?: boolean
  subtitle?: string
}

export default function Toolbar({
  hideGoBack,
  hideHighscore,
  subtitle,
}: Props) {
  const history = useHistory()
  const { id, slug } = useParams<{ id: string; slug: string }>()

  function handleGoBack() {
    history.goBack()
  }

  return (
    <div className="toolbar__spacer">
      <div className="toolbar__container">
        <div className="toolbar">
          <span className="toolbar__icon flex-1">
            {!hideGoBack && (
              <IconButton
                aria-label="Highscore"
                color="inherit"
                onClick={handleGoBack}
              >
                <ArrowBack />
              </IconButton>
            )}
          </span>

          <div>
            <span className="toolbar__title">Hästbett</span>

            {subtitle && <span className={styles.subtitle}>{subtitle}</span>}
          </div>

          <div className="flex-1 text-right">
            {!hideHighscore && (
              <Link to={`/${id}/${slug}/highscore`} title="View highscore">
                <span className="toolbar__icon">
                  <IconButton aria-label="Highscore" color="inherit">
                    <FormatListNumberedIcon />
                  </IconButton>
                </span>
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
