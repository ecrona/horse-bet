import { css } from 'lit-element'

export default css`
  :host {
    display: inline;
  }

  :host([fullwidth]),
  :host([full-width]) {
    display: inline-block;
    width: 100%;
  }

  .button[disabled] {
    /* border: 1px solid rgba(0, 0, 0, 0.12); */
    border: none;

    background-color: transparent;
    box-shadow: none;
    color: rgba(0, 0, 0, 0.67);
    cursor: not-allowed;
    filter: grayscale(0.5);
  }

  .button {
    border: none;
    display: inherit;
    outline: none;
    padding: 0 16px;
    min-height: 72px;
    width: inherit;

    background-color: var(--horse-grey);
    border-radius: 4px;
    box-shadow: 0 1.5px 2px rgba(0, 0, 0, 0.19);
    color: var(--horse-text-dark);
    cursor: pointer;
    font-size: inherit;
    font-weight: 500;
    text-align: center;

    transition: background-color 0.075s ease-in;
  }

  .button:hover {
    background-color: var(--horse-grey-dark);
  }

  .button:active {
    background-color: var(--horse-grey-darker);
  }

  /* Variants */
  .contained {
  }

  /* Colors */
  .primary {
    background-color: var(--horse-primary);
    color: var(--horse-primary-text);
  }

  .primary:hover {
    background-color: var(--horse-primary);
  }

  .primary:active {
    background-color: var(--horse-primary);
  }

  :host([disabled]) .primary {
    background-color: var(--horse-primary);
    color: var(--horse-primary-text);
    filter: none;
  }

  .secondary {
    background-color: var(--horse-secondary);
    color: var(--horse-secondary-text);
  }

  .secondary:hover {
    background-color: var(--horse-secondary);
  }

  .secondary:active {
    background-color: var(--horse-secondary);
  }

  :host([disabled]) .secondary {
    background-color: var(--horse-secondary);
    color: var(--horse-secondary-text);
    filter: none;
  }

  .tertiary {
    background-color: var(--horse-tertiary);
    color: var(--horse-tertiary-text);
  }

  .tertiary:hover {
    background-color: var(--horse-tertiary);
  }

  .tertiary:active {
    background-color: var(--horse-tertiary);
  }

  :host([disabled]) .tertiary {
    background-color: var(--horse-tertiary-light);
    border-color: var(--horse-tertiary);
    color: var(--horse-text);
  }
`
