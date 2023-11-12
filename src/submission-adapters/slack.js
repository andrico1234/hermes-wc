import { SubmissionAdapter } from "./base.js";

/**
 * SlackSubmissionAdapter
 * 
 * @class SlackSubmissionAdapter
 * @extends {SubmissionAdapter}
 */

export class SlackSubmissionAdapter extends SubmissionAdapter {
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

    const sections = entries.map(([key, value]) => {
      return {
        "type": "section",
        fields: [
          {
            "type": "mrkdwn",
            "text": `*${key}:*\n${value}`
          }
        ]
      }
    })

    const blocks = [
      {
        type: 'header',
        text: {
          type: 'plain_text',
          text: 'Website Feedback'
        }
      },
      ...sections,
      {
        "type": "section",
        "fields": [
          {
            "type": "mrkdwn",
            "text": `*Current page:*\n${window.location.href}`
          }
        ]
      }]


    const response = await fetch(this.webhookUrl, {
      method: 'POST',
      body: JSON.stringify({
        blocks
      }),
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    });

    if (response.ok) {
      return { success: true };
    }

    return { success: false, error: response.message };
  }
}

