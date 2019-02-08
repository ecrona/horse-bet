interface AnyAttribute {
  [key: string]: any
}

declare namespace HorseButton {
  type ColorType = 'primary' | 'secondary' | 'tertiary' | 'default'
  type VariantType = 'outlined'

  interface Attributes extends AnyAttribute {
    color?: ColorType
    disabled?: boolean
    fullWidth?: boolean
    variant?: VariantType
  }
}

declare namespace JSX {
  interface IntrinsicElements {
    'horse-button': HorseButton.Attributes
  }
}
