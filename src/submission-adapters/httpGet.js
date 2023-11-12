import { SubmissionAdapter } from "./base.js";

/**
 * HttpGetSubmissionAdapter
 * 
 * @class HttpGetSubmissionAdapter
 * @extends {SubmissionAdapter}
 */

export class HttpGetSubmissionAdapter extends SubmissionAdapter {
  /**
   * 
   * @param {object} params 
   * @param {string} params.url
   */
  constructor(params) {
    super();

    this.url = params.url
  }

  /**
   * 
   * @param {Record<string, unknown>} formData 
   * @returns {Promise<{success: boolean, error?: string}>}
   */
  async submit(formData) {
    const entries = Object.entries({ ...formData, url: window.location.href });

    const params = new URLSearchParams(entries);

    const url = new URL(this.url);

    url.search = params.toString();

    const response = await fetch(url.toString());

    if (response.ok) {
      return {
        success: true
      }
    }

    return {
      success: false,
      error: response.statusText
    }
  }
}