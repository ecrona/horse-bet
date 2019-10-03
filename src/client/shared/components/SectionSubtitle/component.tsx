import clsx from 'clsx'
import React from 'react'
import styles from './styles.scss'

interface Props {}

export class SectionSubtitle extends React.PureComponent<Props> {
  render() {
    const classes = clsx({
      [styles.root]: true
    })

    return <h3 className={classes}>{this.props.children}</h3>
  }
}
