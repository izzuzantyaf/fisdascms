import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { AdminModule } from './use-cases/admin/admin.module';
import { AuthModule } from './use-cases/auth/auth.module';
import { HandoutModule } from './use-cases/handout/handout.module';
import { CodeOfConductModule } from './use-cases/code-of-conduct/code-of-conduct.module';
import { OrganigramModule } from './use-cases/organigram/organigram.module';
import { ScheduleModule } from './use-cases/schedule/schedule.module';
import { AssistantModule } from './use-cases/assistant/assistant.module';
import { PracticumModuleModule } from './use-cases/practicum-module/practicum-module.module';
import { LoggerMiddleware } from './middleware/logger.middleware';

@Module({
  imports: [
    AdminModule,
    AuthModule,
    HandoutModule,
    CodeOfConductModule,
    OrganigramModule,
    ScheduleModule,
    AssistantModule,
    PracticumModuleModule,
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes({
      path: '*',
      method: RequestMethod.ALL,
    });
  }
}
