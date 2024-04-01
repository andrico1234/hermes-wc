import { isSSR } from './utilities/isSSR.js';

import '../src/wrapper/hermes-wrapper.js';
import '../src/score-input/hermes-score-input.js';

if (isSSR) {
  console.warn("You're importing Hermes WC in a server-side rendered environment. Ensure that you run `initializeHermesForm` in a browser environment.")
}

/**
 * @callback SubmissionCompleteCallback
 * @param {Array.<PromiseSettledResult<any>>} results
 */


/**
 * @param {Event} e
 */
const dispatchCloseEvent = (e) => {
  const event = new CustomEvent('hermes-close', {
    composed: true,
    bubbles: true,
  })

  e.target.dispatchEvent(event)
}

/**
 * @param {object} params
 * @param {Array.<import('./submission-adapters/base.js').SubmissionAdapter>} params.submissionAdapters
 * @param {SubmissionCompleteCallback} params.submissionCompleteCallback
 * @returns {() => void}
 */
export function initializeHermesForm(params) {
  import('@shoelace-style/shoelace/dist/components/input/input.js');
  import('@shoelace-style/shoelace/dist/components/button/button.js');

  displayHermesElements()

  const { submissionAdapters = [], submissionCompleteCallback = () => null } = params

  const submissionHandler = handleSubmit(submissionAdapters);

  const cleanupForm = initForm(submissionHandler)
  const cleanupCloseButtons = initCloseButtons()
  const cleanupSubmissionCompleteHandler = initSubmissionCompleteHandler(submissionCompleteCallback)

  return () => {
    cleanupCloseButtons()
    cleanupForm();
    cleanupSubmissionCompleteHandler()
  }
}


async function displayHermesElements() {
  /**
   * This prevents flash of undefined custom elements. By default the hermes-wrapper is hidden, and will appear when the custom element is defined.  
   */
  await Promise.allSettled([
    customElements.whenDefined('hermes-wrapper'),
  ])

  const hermesWrapper = document.querySelector('hermes-wrapper')
  hermesWrapper.classList.add('hermes-loaded')
}

/**
 * 
 * @param {Array.<import('./submission-adapters/base.js').SubmissionAdapter>} adapters
 */
const handleSubmit = (adapters) => (e) => {
  e.preventDefault()
  const formData = new FormData(e.target)

  const entries = {}

  formData.forEach((value, key) => {
    if (Reflect.has(entries, key)) {
      const entry = entries[key];

      if (Array.isArray(entry)) {
        entry.push(value);
      } else {
        entries[key] = [entries[key], value];
      }
    } else {
      entries[key] = value;
    }
  })

  let submissionPromises = []

  adapters.forEach((adapter) => {
    submissionPromises.push(adapter.submit(entries))
  })

  Promise.allSettled(submissionPromises).then((results) => {
    const event = new CustomEvent('hermes-submission.complete', {
      composed: true,
      bubbles: true,
      detail: results
    })

    document.dispatchEvent(event)
  })

  e.target.reset();
}

/**
 * 
 * @returns {() => void}
 */
const initCloseButtons = () => {
  const closeButtons = document.querySelectorAll('[data-hermes="close"]')

  closeButtons.forEach((closeButton) => {
    closeButton.addEventListener('click', dispatchCloseEvent)
  })

  return () => {
    closeButtons.forEach((closeButton) => {
      closeButton.removeEventListener('click', dispatchCloseEvent)
    })
  }
}


/**
 * @returns {HTMLFormElement | undefined} 
 */
const getForm = () => {
  const form = document.querySelector('[data-hermes="form"]')

  if (!form) {
    return
  }

  return form;
}

const initForm = (submissionHandler) => {
  const form = getForm()

  if (!form) {
    console.error('No form element with id "hermes-form" was found. Please ensure it exists in the DOM')
    return () => { }
  }

  form.addEventListener('submit', submissionHandler)

  return () => {
    form.removeEventListener('submit', submissionHandler)
  }
}

/**
 * @param {SubmissionCompleteCallback} submissionCompleteCallback
 */
const initSubmissionCompleteHandler = (submissionCompleteCallback) => {
  if (!submissionCompleteCallback) {
    return () => { }
  }

  const handleSubmissionComplete = (e) => {
    return submissionCompleteCallback(e.detail)
  }

  document.addEventListener('hermes-submission.complete', handleSubmissionComplete)

  return () => {
    document.removeEventListener('hermes-submission.complete', handleSubmissionComplete)
  }
}

