declare class ExponentialBackoffRetryConfig {
    private _currentAttempt;
    private readonly _maxAttempt;
    constructor(maxAttempt?: number);
    getWaitingTime(): number;
    incrementAttempt(): void;
    isNextAttemptAllowed(): boolean;
}
export { ExponentialBackoffRetryConfig };
