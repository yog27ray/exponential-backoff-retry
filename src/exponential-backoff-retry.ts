import { ExponentialBackoffRetryConfig } from './exponential-backoff-retry-config';

function wait(timeout: number): Promise<unknown> {
  return new Promise((resolve: (item?: unknown) => void) => {
    setTimeout(resolve, timeout);
  });
}

async function exponentialBackoffRetry<T>(
  executionFunction: () => Promise<T>,
  exponentialRetryConfig: ExponentialBackoffRetryConfig = new ExponentialBackoffRetryConfig()): Promise<T> {
  try {
    return await executionFunction();
  } catch (error) {
    if (!exponentialRetryConfig.isNextAttemptAllowed()) {
      return Promise.reject(error);
    }
    exponentialRetryConfig.incrementAttempt();
    const waitingTime = exponentialRetryConfig.getWaitingTime();
    await wait(waitingTime);
    return exponentialBackoffRetry<T>(executionFunction, exponentialRetryConfig);
  }
}

export { exponentialBackoffRetry };
