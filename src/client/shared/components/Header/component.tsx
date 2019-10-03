import clsx from 'clsx'
import React from 'react'
import styles from './styles.scss'

interface Props {}

export class Header extends React.PureComponent<Props> {
  render() {
    const headerClasses = clsx({
      [styles.root]: true
    })

    return <h1 className={headerClasses}>{this.props.children}</h1>
  }
}
