import { ExponentialBackoffRetryConfig } from './exponential-backoff-retry-config';

class ExponentialBackoffRetry {
  static exponentialBackoffRetry(
    executionFunction: () => Promise<any>,
    exponentialRetryConfig: ExponentialBackoffRetryConfig = new ExponentialBackoffRetryConfig()): Promise<any> {
    const waitingTime = exponentialRetryConfig.getWaitingTime();
    return new Promise((resolve: (value: any) => void, reject: (error: Error) => void) => {
      // eslint-disable-next-line @typescript-eslint/no-misused-promises
      setTimeout(() => {
        ExponentialBackoffRetry.executeFunction(executionFunction, exponentialRetryConfig)
          .then(resolve)
          .catch(reject);
      }, waitingTime);
    });
  }

  private static async executeFunction(
    executionFunction: () => Promise<any>,
    exponentialRetryConfig: ExponentialBackoffRetryConfig = new ExponentialBackoffRetryConfig()): Promise<any> {
    try {
      return await executionFunction();
    } catch (error) {
      if (!exponentialRetryConfig.isNextAttemptAllowed()) {
        return Promise.reject(error);
      }
      exponentialRetryConfig.incrementAttempt();
      return ExponentialBackoffRetry.exponentialBackoffRetry(executionFunction, exponentialRetryConfig);
    }
  }
}

const { exponentialBackoffRetry } = ExponentialBackoffRetry;
export { exponentialBackoffRetry };
