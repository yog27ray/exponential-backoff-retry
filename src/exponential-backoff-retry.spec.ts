import { expect } from 'chai';
import { exponentialBackoffRetry } from './exponential-backoff-retry';
import { ExponentialBackoffRetryConfig } from './exponential-backoff-retry-config';

describe('ExponentialBackOffRetry', () => {
  context('execution of exponentialRetry', () => {
    let retryCount: number = 0;
    function testExecutionFunction(): Promise<any> {
      if (retryCount === 2) {
        return Promise.resolve({ retryCount });
      }
      retryCount += 1;
      throw new Error('Unauthorised user');
    }

    it('should return result on second attempt', async () => {
      retryCount = 0;
      const result = await exponentialBackoffRetry(() => testExecutionFunction(), new ExponentialBackoffRetryConfig());
      expect(result).to.deep.equal({ retryCount: 2 });
    });

    it('should return error when maxAttempt is reached and error occurred', async () => {
      retryCount = 0;
      try {
        await exponentialBackoffRetry(() => testExecutionFunction(), new ExponentialBackoffRetryConfig(1));
        await Promise.reject({ code: 99, messsage: 'should not reach here.' });
      } catch (error) {
        expect(error.message).to.equals('Unauthorised user');
      }
    });
  });
});
