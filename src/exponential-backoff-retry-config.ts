class ExponentialBackoffRetryConfig {
  private _currentAttempt = 0;

  private readonly _maxAttempt: number;

  constructor(maxAttempt: number = 3) {
    this._maxAttempt = maxAttempt;
  }

  getWaitingTime(): number {
    if (!this._currentAttempt) {
      return 0;
    }
    return (2 ** this._currentAttempt) * 1000;
  }

  incrementAttempt(): void {
    this._currentAttempt += 1;
  }

  isNextAttemptAllowed(): boolean {
    return this._currentAttempt < this._maxAttempt;
  }
}

export { ExponentialBackoffRetryConfig };
