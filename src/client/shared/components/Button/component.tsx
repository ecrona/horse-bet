import React from 'react'
import classNames from 'classnames'
import styles from './styles.scss'

enum VariantType {
  Default = 'default',
  Primary = 'primary'
}

type Variant = 'default' | 'primary'

// TODO: Variant in this case is more representative to "color".
// Variant should represent a different type of button
interface Props {
  disabled?: boolean
  fullWidth?: boolean
  style?: any
  variant?: Variant
  onClick?: (e: any) => any
}

export class Button extends React.PureComponent<Props> {
  static defaultProps = {
    variant: VariantType.Default
  }

  render() {
    const buttonClasses = classNames({
      [styles.root]: true,
      [styles.fullWidth]: this.props.fullWidth,
      [styles.primary]: this.props.variant === VariantType.Primary
    })

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
