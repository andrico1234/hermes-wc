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
    constructor(params: {
        url: string;
    });
    url: string;
}
import { SubmissionAdapter } from "./base.js";
