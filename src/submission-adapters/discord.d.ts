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
    constructor(params: {
        webhookUrl: string;
    });
    webhookUrl: string;
}
import { SubmissionAdapter } from "./base.js";
