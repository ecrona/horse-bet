import * as React from 'react'
import classNames from 'classnames'
import styles from './styles.scss'

interface Props {
  children: any
}

export class Header extends React.PureComponent<Props> {
  render() {
    const headerClasses = classNames({
      [styles.root]: true
    })

    return <h1 className={headerClasses}>{this.props.children}</h1>
  }
}
