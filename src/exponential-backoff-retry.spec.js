"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = require("chai");
const exponential_backoff_retry_1 = require("./exponential-backoff-retry");
const exponential_backoff_retry_config_1 = require("./exponential-backoff-retry-config");
describe('ExponentialBackOffRetry', () => {
    context('execution of exponentialRetry', () => {
        let retryCount = 0;
        function testExecutionFunction() {
            if (retryCount === 2) {
                return Promise.resolve({ retryCount });
            }
            retryCount += 1;
            throw new Error('Unauthorised user');
        }
        it('should return result on second attempt', async () => {
            retryCount = 0;
            const result = await exponential_backoff_retry_1.exponentialBackoffRetry(() => testExecutionFunction(), new exponential_backoff_retry_config_1.ExponentialBackoffRetryConfig());
            chai_1.expect(result).to.deep.equal({ retryCount: 2 });
        });
        it('should return error when maxAttempt is reached and error occurred', async () => {
            retryCount = 0;
            try {
                await exponential_backoff_retry_1.exponentialBackoffRetry(() => testExecutionFunction(), new exponential_backoff_retry_config_1.ExponentialBackoffRetryConfig(1));
                await Promise.reject({ code: 99, messsage: 'should not reach here.' });
            }
            catch (error) {
                chai_1.expect(error.message).to.equals('Unauthorised user');
            }
        });
    });
});
//# sourceMappingURL=exponential-backoff-retry.spec.js.map