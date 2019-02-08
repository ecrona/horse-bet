import React from 'react'
import classNames from 'classnames'
import styles from './styles.scss'

interface Props {}

export class SectionSubtitle extends React.PureComponent<Props> {
  render() {
    const classes = classNames({
      [styles.root]: true
    })

    return <h3 className={classes}>{this.props.children}</h3>
  }
}
