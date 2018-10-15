import React from 'react'
import classNames from 'classnames'
import styles from './styles.scss'

interface Props {}

export class SectionContent extends React.PureComponent<Props> {
  render() {
    const classes = classNames({
      [styles.root]: true
    })

    return <div className={classes}>{this.props.children}</div>
  }
}
