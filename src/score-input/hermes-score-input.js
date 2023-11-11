import { LitElement, css, html } from "lit";
import { map } from 'lit/directives/map.js';
import { range } from 'lit/directives/range.js';
import '@shoelace-style/shoelace/dist/components/radio-group/radio-group.js'
import '@shoelace-style/shoelace/dist/components/radio-button/radio-button.js'

class HermesScoreInput extends LitElement {
  static get formAssociated() {
    return true
  }

  #internals

  static styles = css`
    sl-radio-group::part(button-group) {
      width: 100%;
    }

    sl-radio-button {
      width: 100%;
    }

    #helper-text-wrapper {
      display: flex;
      justify-content: space-between;
    }

    #helper-text-wrapper p {
      margin: 0;
      font-size: var(--hermes-score-input-helper-text-font-size);
    }
  `

  static properties = {
    scoreCount: {
      type: Number,
      attribute: 'score-count'
    },
    startHelperText: {
      attribute: 'start-helper-text'
    },
    endHelperText: {
      attribute: 'end-helper-text'
    }
  }

  constructor() {
    super()

    this.#internals = this.attachInternals()
  }

  handleClick = (e) => {
    this.#internals.setFormValue(e.target.value)
  }

  renderRadio = (value) => {
    return html`<sl-radio-button @click=${this.handleClick} value=${value}>${value}</sl-radio-button>`
  }

  render() {
    return html`
      <sl-radio-group label=${this.label ?? "Score"}>
        ${map(range(this.scoreCount ?? 5), (val) => {
      return this.renderRadio(val + 1)
    })}
      </sl-radio-group>
      <div id="helper-text-wrapper">
        <p>${this.startHelperText}</p>
        <p>${this.endHelperText}</p>
      </div>
    `
  }
}

customElements.define('hermes-score-input', HermesScoreInput);