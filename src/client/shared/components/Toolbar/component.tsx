import React from 'react'
import IconButton from '@material-ui/core/IconButton'
import FormatListNumberedIcon from '@material-ui/icons/FormatListNumbered'
import styles from './styles.scss'

interface Props {
  subtitle?: string
}

export class Toolbar extends React.PureComponent<Props> {
  render() {
    return (
      <div className={styles.root}>
        <div className={styles.left} />

        <span className={styles.center}>
          <span className={styles.title}>Horse bet</span>

          {this.props.subtitle && (
            <span className={styles.subtitle}>{this.props.subtitle}</span>
          )}
        </span>

        <div className={styles.right}>
          <IconButton aria-label="Highscore" color="inherit">
            <FormatListNumberedIcon />
          </IconButton>
        </div>
      </div>
    )
  }
}
