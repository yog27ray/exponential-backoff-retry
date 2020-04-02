# Exponential Backoff Retry

It is simple exponential backoff retry algorithm implementation.

## Getting Started

1. Execute function 'functionToExecuteInBackoffRetry' with exponential retry.

```
import { exponentialBackoffRetry } from 'exponential-backoff-retry';

exponentialBackoffRetry(async () => functionToExecuteInBackoffRetry())
.then(result => {})
.catch(error => {});
```

2. Execute function 'functionToExecuteInBackoffRetry' with exponential retry with max attempt as 100.
```
import { exponentialBackoffRetry, ExponentialBackoffRetryConfig } from 'exponential-backoff-retry';

exponentialBackoffRetry(async () => functionToExecuteInBackoffRetry(), new ExponentialBackoffRetryConfig(100))
.then(result => {})
.catch(error => {});
```
