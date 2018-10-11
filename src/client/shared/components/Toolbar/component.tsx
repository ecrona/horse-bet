import React from 'react'
import IconButton from '@material-ui/core/IconButton'
import FormatListNumberedIcon from '@material-ui/icons/FormatListNumbered'
import styles from './styles.scss'

interface Props {
  classes?: any
}

export class Toolbar extends React.PureComponent<Props> {
  render() {
    return (
      <div className={styles.root}>
        <div className={styles.left} />

        <span className={styles.title}>Horse bet</span>

        <div className={styles.right}>
          <IconButton aria-label="Highscore" color="inherit">
            <FormatListNumberedIcon />
          </IconButton>
        </div>
      </div>
    )
  }
}
