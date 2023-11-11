import { SubmissionAdapter } from "./base.js";

/**
 * DiscordSubmissionAdapter
 * 
 * @class DiscordSubmissionAdapter
 * @extends {SubmissionAdapter}
*/
export class DiscordSubmissionAdapter extends SubmissionAdapter {
  /**
   * 
   * @param {object} params 
   * @param {string} params.webhookUrl
   */
  constructor(params) {
    super();

    this.webhookUrl = params.webhookUrl
  }

  /**
   * 
   * @param {Record<string, unknown>} formData 
   * @returns {Promise<{success: boolean, error?: string}>}
   */
  async submit(formData) {
    const entries = Object.entries(formData);

    const content = `**Website Feedback**
${entries.map(([key, value]) => `**${key}**: ${value}`).join('\n')}
Current page: ${window.location.href}
`;

    const response = await fetch(this.webhookUrl, {
      method: 'POST',
      body: JSON.stringify({
        content
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    });

    if (response.status < 400 && !content.includes('booboo')) {
      return { success: true };
    } else {
      return { success: false, error: response.message };
    }
  }
}
