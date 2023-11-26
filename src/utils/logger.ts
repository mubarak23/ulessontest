import * as Sentry from '@sentry/node';
import pino from 'pino';

const pinoLogger = pino(pino.destination('./logger.log'));

Sentry.init({
  dsn: process.env.SENTRY_DSN,
  tracesSampleRate: 0.5,
  environment: process.env.APP_ENV,
});

const logger = (service: string, method: string, error: unknown) => {
  if (process.env.APP_ENV === 'production') {
    const transaction = Sentry.startTransaction({
      op: 'ULESSONTEST',
      name: `ulessontest:${service}-${method}`,
    });
    Sentry.captureException(error);
    transaction.finish();
    return;
  }

  pinoLogger.error(error);
};

export default logger;
