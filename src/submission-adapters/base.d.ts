/**
 * SubmissionAdapter
 *
 * @class SubmissionAdapter
 */
export class SubmissionAdapter {
    /**
     *
     * @param {Record<string, unknown>} formData
     * @returns {Promise<{success: boolean, error?: string}>}
     */
    submit(formData: Record<string, unknown>): Promise<{
        success: boolean;
        error?: string;
    }>;
}
