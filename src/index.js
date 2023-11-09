import '@shoelace-style/shoelace/dist/themes/light.css';
import '@shoelace-style/shoelace/dist/components/input/input.js'
import '@shoelace-style/shoelace/dist/components/button/button.js'

import '../src/wrapper/hermes-wrapper.js';
import '../src/score-input/hermes-score-input.js';


const dispatchCloseEvent = (e) => {
  const event = new CustomEvent('hermes-close', {
    composed: true,
    bubbles: true,
  })

  e.target.dispatchEvent(event)
}

const initCloseButtons = () => {
  const closeButtons = document.querySelectorAll('[data-hermes="close"]')

  closeButtons.forEach((closeButton) => {
    closeButton.addEventListener('click', dispatchCloseEvent)
  })
}

const handleSubmit = (e) => {
  e.preventDefault()
  // console.log(e)
  const formData = new FormData(e.target)
  console.log(formData.get('score'))
  console.log(formData.get('feedback'))
}

const initForm = () => {
  const form = document.querySelector('[data-hermes="form"]')

  if (!form) {
    console.error('No form element with id "hermes-form" was found. Please ensure it exists in the DOM')
    return
  }

  form.addEventListener('submit', handleSubmit)
}

export function initializeHermesForm() {
  initForm()
  initCloseButtons()
}
