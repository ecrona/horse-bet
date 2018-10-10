import * as React from 'react'
import classNames from 'classnames'
import styles from './styles.scss'

enum VariantType {
  Default = 'default',
  Primary = 'primary'
}

type Variant = 'default' | 'primary'

interface Props {
  children: any
  disabled?: boolean
  fullWidth?: boolean
  variant?: Variant
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
      <button className={buttonClasses} disabled={this.props.disabled}>
        {this.props.children}
      </button>
    )
  }
}
