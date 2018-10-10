import * as React from 'react'
import classNames from 'classnames'
import styles from './styles.scss'

interface Props {
  children: any
  spaced?: boolean
}

export class Card extends React.PureComponent<Props> {
  render() {
    const cardClasses = classNames({
      [styles.root]: true,
      [styles.spaced]: this.props.spaced
    })

    return <div className={cardClasses}>{this.props.children}</div>
  }
}
