"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = require("chai");
const exponential_backoff_retry_config_1 = require("./exponential-backoff-retry-config");
describe('ExponentialBackOffRetryConfig', () => {
    context('execution of config object with maxAttempt provided', () => {
        it('should update correctly', async () => {
            const exponentialBackoffRetryConfig = new exponential_backoff_retry_config_1.ExponentialBackoffRetryConfig();
            (0, chai_1.expect)(exponentialBackoffRetryConfig.getWaitingTime()).to.equal(0);
            (0, chai_1.expect)(exponentialBackoffRetryConfig.isNextAttemptAllowed()).to.be.true;
            exponentialBackoffRetryConfig.incrementAttempt();
            (0, chai_1.expect)(exponentialBackoffRetryConfig.getWaitingTime()).to.equal(2000);
            (0, chai_1.expect)(exponentialBackoffRetryConfig.isNextAttemptAllowed()).to.be.true;
            exponentialBackoffRetryConfig.incrementAttempt();
            (0, chai_1.expect)(exponentialBackoffRetryConfig.getWaitingTime()).to.equal(4000);
            (0, chai_1.expect)(exponentialBackoffRetryConfig.isNextAttemptAllowed()).to.be.true;
            exponentialBackoffRetryConfig.incrementAttempt();
            (0, chai_1.expect)(exponentialBackoffRetryConfig.getWaitingTime()).to.equal(8000);
            (0, chai_1.expect)(exponentialBackoffRetryConfig.isNextAttemptAllowed()).to.be.false;
        });
    });
    context('execution of config object without maxAttempt provided', () => {
        it('should update correctly', async () => {
            const exponentialBackoffRetryConfig = new exponential_backoff_retry_config_1.ExponentialBackoffRetryConfig(2);
            (0, chai_1.expect)(exponentialBackoffRetryConfig.getWaitingTime()).to.equal(0);
            (0, chai_1.expect)(exponentialBackoffRetryConfig.isNextAttemptAllowed()).to.be.true;
            exponentialBackoffRetryConfig.incrementAttempt();
            (0, chai_1.expect)(exponentialBackoffRetryConfig.getWaitingTime()).to.equal(2000);
            (0, chai_1.expect)(exponentialBackoffRetryConfig.isNextAttemptAllowed()).to.be.true;
            exponentialBackoffRetryConfig.incrementAttempt();
            (0, chai_1.expect)(exponentialBackoffRetryConfig.getWaitingTime()).to.equal(4000);
            (0, chai_1.expect)(exponentialBackoffRetryConfig.isNextAttemptAllowed()).to.be.false;
        });
    });
});
//# sourceMappingURL=exponential-backoff-retry-config.spec.js.map