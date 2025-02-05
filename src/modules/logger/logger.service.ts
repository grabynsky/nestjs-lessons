import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as Sentry from '@sentry/nestjs';
import { nodeProfilingIntegration } from '@sentry/profiling-node';

import { SentryConfig } from '../../configs/config.type';

@Injectable()
export class LoggerService {
  private readonly isLocal: boolean;
  private readonly logger = new Logger();

  constructor(private readonly configService: ConfigService) {
    const sentyConfig = configService.get<SentryConfig>('sentry');
    this.isLocal = sentyConfig.env === 'local';

    Sentry.init({
      dsn: sentyConfig.dsn,
      integrations: [nodeProfilingIntegration()],
      tracesSampleRate: 1.0,
      debug: sentyConfig.debug,
      profilesSampleRate: 1.0,
    });
  }
  public log(message: string): void {
    if (this.isLocal) {
      this.logger.log(message);
    } else {
      Sentry.captureMessage(message, 'log');
    }
  }
  public info(message: string): void {
    if (this.isLocal) {
      this.logger.log(message);
    } else {
      Sentry.captureMessage(message, 'info');
    }
  }
  public warn(message: string): void {
    if (this.isLocal) {
      this.logger.log(message);
    } else {
      Sentry.captureMessage(message, 'warning');
    }
  }
  public error(error: any): void {
    if (this.isLocal) {
      this.logger.error(error, error.stack);
    } else {
      Sentry.captureException(error, { level: 'error' });
    }
  }
}
