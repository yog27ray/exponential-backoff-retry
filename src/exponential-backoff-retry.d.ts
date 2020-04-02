import { ExponentialBackoffRetryConfig } from './exponential-backoff-retry-config';
declare class ExponentialBackoffRetry {
    static exponentialBackoffRetry(executionFunction: () => Promise<any>, exponentialRetryConfig?: ExponentialBackoffRetryConfig): Promise<any>;
    private static executeFunction;
}
declare const exponentialBackoffRetry: typeof ExponentialBackoffRetry.exponentialBackoffRetry;
export { exponentialBackoffRetry };
