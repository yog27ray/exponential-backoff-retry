import { expect } from 'chai';
import { ExponentialBackoffRetryConfig } from './exponential-backoff-retry-config';

describe('ExponentialBackOffRetryConfig', () => {
  context('execution of config object with maxAttempt provided', () => {
    it('should update correctly', async () => {
      const exponentialBackoffRetryConfig = new ExponentialBackoffRetryConfig();
      expect(exponentialBackoffRetryConfig.getWaitingTime()).to.equal(0);
      expect(exponentialBackoffRetryConfig.isNextAttemptAllowed()).to.be.true;
      exponentialBackoffRetryConfig.incrementAttempt();
      expect(exponentialBackoffRetryConfig.getWaitingTime()).to.equal(2000);
      expect(exponentialBackoffRetryConfig.isNextAttemptAllowed()).to.be.true;
      exponentialBackoffRetryConfig.incrementAttempt();
      expect(exponentialBackoffRetryConfig.getWaitingTime()).to.equal(4000);
      expect(exponentialBackoffRetryConfig.isNextAttemptAllowed()).to.be.true;
      exponentialBackoffRetryConfig.incrementAttempt();
      expect(exponentialBackoffRetryConfig.getWaitingTime()).to.equal(8000);
      expect(exponentialBackoffRetryConfig.isNextAttemptAllowed()).to.be.false;
    });
  });

  context('execution of config object without maxAttempt provided', () => {
    it('should update correctly', async () => {
      const exponentialBackoffRetryConfig = new ExponentialBackoffRetryConfig(2);
      expect(exponentialBackoffRetryConfig.getWaitingTime()).to.equal(0);
      expect(exponentialBackoffRetryConfig.isNextAttemptAllowed()).to.be.true;
      exponentialBackoffRetryConfig.incrementAttempt();
      expect(exponentialBackoffRetryConfig.getWaitingTime()).to.equal(2000);
      expect(exponentialBackoffRetryConfig.isNextAttemptAllowed()).to.be.true;
      exponentialBackoffRetryConfig.incrementAttempt();
      expect(exponentialBackoffRetryConfig.getWaitingTime()).to.equal(4000);
      expect(exponentialBackoffRetryConfig.isNextAttemptAllowed()).to.be.false;
    });
  });
});
