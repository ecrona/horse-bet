import { LitElement, property, customElement, html } from 'lit-element'
import classnames from 'classnames'
import styles from './styles'

@customElement('horse-button')
export class HorseButton extends LitElement {
  @property({ type: String })
  public color?: HorseButton.ColorType

  @property({ type: Boolean })
  public disabled = false

  @property({ attribute: 'full-width', type: Boolean })
  public fullWidth = false

  @property({ type: String })
  public variant?: HorseButton.VariantType

  render() {
    const classes = classnames({
      button: true,
      [this.color]: Boolean(this.color),
      fullwidth: this.fullWidth,
      [this.variant]: Boolean(this.variant)
    })

    return html`
      ${styles}

      <button class=${classes} .disabled=${this.disabled}>
        <slot></slot>
      </button>
    `
  }
}
