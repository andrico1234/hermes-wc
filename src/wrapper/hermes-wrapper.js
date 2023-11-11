import { LitElement, html, css } from "lit";
import { when } from 'lit/directives/when.js'

class HermesWrapper extends LitElement {
  DEFAULT_TITLE = 'Feedback'

  static styles = css`
    :host {
      font-family: var(--hermes-wrapper-font-family);
    }

    * {
      box-sizing: border-box;
    }

    #wrapper {
      position: fixed;
      right: 0;
      top: 50%;
      transform: translateY(-50%);
    }
    
    #inner-wrapper {
      position: relative;
    }

    #content-wrapper {
      padding: 8px;
    }

    #feedback-button {
      position: absolute;
      padding: 0;
      transform-origin: right;
      width: fit-content;
      right: 0;
      top: 50%;
      transform: rotate(-90deg) translate(50%, -50%);
      margin: 0;
      background: none;
      border: none;
      font-size: var(--hermes-wrapper-font-size);
      cursor: pointer;
    }

    #feedback-button::part(base) {
      border-bottom-left-radius: 0;
      border-bottom-right-radius: 0;
    }

    #slot-wrapper {
      display: flex;
      flex-direction: column;
      gap: 8px;
      align-items: end;
      width: var(--hermes-wrapper-form-width);
    }
  `

  static properties = {
    label: {},
    isFormVisible: { type: Boolean }
  }

  firstUpdated() {
    this.addEventListener('hermes-close', this.handleClose)
  }

  disconnectedCallback() {
    this.removeEventListener('hermes-close', this.handleClose);
  }

  handleClose = () => {
    this.isFormVisible = false
  }

  setFormVisibleState = (isVisible) => {
    this.isFormVisible = isVisible
  }

  handleSubmit = (e) => {
    e.preventDefault()
  }

  render() {
    return html`
    <div id="wrapper">
      <div id="inner-wrapper">
        ${when(this.isFormVisible, () => {
      return html`
      <div id="content-wrapper">
        <slot id="slot-wrapper"></slot>
        </div>`
    }, () => {
      // Move this button to another component        
      return html`<sl-button variant="neutral" id="feedback-button" @click=${() => this.setFormVisibleState(!this.isFormVisible)}>
          ${this.label ?? this.DEFAULT_TITLE}
        </sl-button>`
    })}
    </div>
    </div>
    `
  }
}

customElements.define('hermes-wrapper', HermesWrapper);


/*

Options

1. Add a click handler to the slot inside of the Hermes wrapper.
If it's clicked and the id of the element has something like Submit, then trigger the form submission.
When the form is submitted, then traverse the slotted children and all of the elements with

*/


// what happens 
// delegates focus


// I'm listening for click event and checking that the clicked target is a submit button - calling requestSubmit()
// In the 'formdata' event listener on the form I'm finding the slot element and looping through the assigned elements and searching for form elements and using formdata.set to set the name/values
// The submit handler on the form then gets called and voila - data is right there