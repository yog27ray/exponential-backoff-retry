"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const exponential_backoff_retry_config_1 = require("./exponential-backoff-retry-config");
class ExponentialBackoffRetry {
    static exponentialBackoffRetry(executionFunction, exponentialRetryConfig = new exponential_backoff_retry_config_1.ExponentialBackoffRetryConfig()) {
        const waitingTime = exponentialRetryConfig.getWaitingTime();
        return new Promise((resolve, reject) => {
            // eslint-disable-next-line @typescript-eslint/no-misused-promises
            setTimeout(() => {
                ExponentialBackoffRetry.executeFunction(executionFunction, exponentialRetryConfig)
                    .then(resolve)
                    .catch(reject);
            }, waitingTime);
        });
    }
    static async executeFunction(executionFunction, exponentialRetryConfig = new exponential_backoff_retry_config_1.ExponentialBackoffRetryConfig()) {
        try {
            return await executionFunction();
        }
        catch (error) {
            if (!exponentialRetryConfig.isNextAttemptAllowed()) {
                return Promise.reject(error);
            }
            exponentialRetryConfig.incrementAttempt();
            return ExponentialBackoffRetry.exponentialBackoffRetry(executionFunction, exponentialRetryConfig);
        }
    }
}
const { exponentialBackoffRetry } = ExponentialBackoffRetry;
exports.exponentialBackoffRetry = exponentialBackoffRetry;
//# sourceMappingURL=exponential-backoff-retry.js.map