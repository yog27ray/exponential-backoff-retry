"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.exponentialBackoffRetry = void 0;
const exponential_backoff_retry_config_1 = require("./exponential-backoff-retry-config");
function wait(timeout) {
    return new Promise((resolve) => {
        setTimeout(resolve, timeout);
    });
}
async function exponentialBackoffRetry(executionFunction, exponentialRetryConfig = new exponential_backoff_retry_config_1.ExponentialBackoffRetryConfig()) {
    try {
        return await executionFunction();
    }
    catch (error) {
        if (!exponentialRetryConfig.isNextAttemptAllowed()) {
            return Promise.reject(error);
        }
        exponentialRetryConfig.incrementAttempt();
        const waitingTime = exponentialRetryConfig.getWaitingTime();
        await wait(waitingTime);
        return exponentialBackoffRetry(executionFunction, exponentialRetryConfig);
    }
}
exports.exponentialBackoffRetry = exponentialBackoffRetry;
//# sourceMappingURL=exponential-backoff-retry.js.map