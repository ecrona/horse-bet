import React from 'react'
import classNames from 'classnames'
import styles from './styles.scss'

interface Props {}

export class SectionTitle extends React.PureComponent<Props> {
  render() {
    const classes = classNames({
      [styles.root]: true
    })

    return <h2 className={classes}>{this.props.children}</h2>
  }
}
