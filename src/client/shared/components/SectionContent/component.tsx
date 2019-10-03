import clsx from 'clsx'
import React from 'react'
import styles from './styles.scss'

interface Props {}

export class SectionContent extends React.PureComponent<Props> {
  render() {
    const classes = clsx({
      [styles.root]: true
    })

    return <div className={classes}>{this.props.children}</div>
  }
}
