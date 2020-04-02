"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ExponentialBackoffRetryConfig {
    constructor(maxAttempt = 3) {
        this._currentAttempt = 0;
        this._maxAttempt = maxAttempt;
    }
    getWaitingTime() {
        if (!this._currentAttempt) {
            return 0;
        }
        return (2 ** this._currentAttempt) * 1000;
    }
    incrementAttempt() {
        this._currentAttempt += 1;
    }
    isNextAttemptAllowed() {
        return this._currentAttempt < this._maxAttempt;
    }
}
exports.ExponentialBackoffRetryConfig = ExponentialBackoffRetryConfig;
//# sourceMappingURL=exponential-backoff-retry-config.js.map