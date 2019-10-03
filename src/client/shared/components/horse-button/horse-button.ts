import clsx from 'clsx'
import { customElement, html, LitElement, property } from 'lit-element'
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

  static styles = styles

  render() {
    const classes = clsx({
      button: true,
      [this.color]: Boolean(this.color),
      fullwidth: this.fullWidth,
      [this.variant]: Boolean(this.variant)
    })

    return html`
      <button class=${classes} part="button" .disabled=${this.disabled}>
        <slot></slot>
      </button>
    `
  }
}
