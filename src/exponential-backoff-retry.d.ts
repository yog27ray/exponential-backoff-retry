import { ExponentialBackoffRetryConfig } from './exponential-backoff-retry-config';
declare function exponentialBackoffRetry<T>(executionFunction: () => Promise<T>, exponentialRetryConfig?: ExponentialBackoffRetryConfig): Promise<T>;
export { exponentialBackoffRetry };
