import clsx from 'clsx'
import React from 'react'
import styles from './styles.scss'

interface Props {
  spaced?: boolean
}

export class Section extends React.PureComponent<Props> {
  render() {
    const classes = clsx({
      [styles.root]: true,
      [styles.spaced]: this.props.spaced
    })

    return <div className={classes}>{this.props.children}</div>
  }
}
