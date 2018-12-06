import React from 'react'
import classNames from 'classnames'
import styles from './styles.scss'

interface Props {
  disabled?: boolean
  className?: string
  fullWidth?: boolean
  selected?: boolean
  style?: any
  onClick?: (e: any) => any
}

export class Button extends React.PureComponent<Props> {
  render() {
    const buttonClasses = classNames(
      {
        [styles.root]: true,
        [styles.fullWidth]: this.props.fullWidth,
        [styles.selected]: this.props.selected
      },
      this.props.className
    )

    return (
      <button
        className={buttonClasses}
        disabled={this.props.disabled}
        style={this.props.style}
        onClick={this.props.onClick}
      >
        {this.props.children}
      </button>
    )
  }
}
