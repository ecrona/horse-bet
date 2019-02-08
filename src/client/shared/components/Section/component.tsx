import React from 'react'
import classNames from 'classnames'
import styles from './styles.scss'

interface Props {
  spaced?: boolean
}

export class Section extends React.PureComponent<Props> {
  render() {
    const classes = classNames({
      [styles.root]: true,
      [styles.spaced]: this.props.spaced
    })

    return <div className={classes}>{this.props.children}</div>
  }
}
