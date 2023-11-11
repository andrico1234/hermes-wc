/**
 * @param {object} params
 * @param {Array.<import('./submission-adapters/base.js').SubmissionAdapter>} params.submissionAdapters
 * @param {SubmissionCompleteCallback} params.submissionCompleteCallback
 * @returns {() => void}
 */
export function initializeHermesForm(params: {
    submissionAdapters: Array<import('./submission-adapters/base.js').SubmissionAdapter>;
    submissionCompleteCallback: SubmissionCompleteCallback;
}): () => void;
export type SubmissionCompleteCallback = (results: Array<PromiseSettledResult<any>>) => any;
