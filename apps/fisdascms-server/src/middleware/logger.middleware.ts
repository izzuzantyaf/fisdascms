import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  private readonly logger = new Logger('HTTP');

  use(req: Request, res: Response, next: NextFunction) {
    this.logger.log(
      `${req.method} ${req.path} ${JSON.stringify({
        'user-agent': req.headers['user-agent'],
        ip: req.ip,
      })}`,
    );
    next();
  }
}
