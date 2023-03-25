import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { AdminModule } from './domains/admin/admin.module';
import { AuthModule } from './domains/auth/auth.module';
import { HandoutModule } from './domains/handout/handout.module';
import { CodeOfConductModule } from './domains/code-of-conduct/code-of-conduct.module';
import { OrganigramModule } from './domains/organigram/organigram.module';
import { ScheduleModule } from './domains/schedule/schedule.module';
import { AssistantModule } from './domains/assistant/assistant.module';
import { PracticumModuleModule } from './domains/practicum-module/practicum-module.module';
import { RequestLoggingMiddleware } from './middleware/request-logging.middleware';
import { SocialMediaModule } from './domains/social-media/social-media.module';
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
    SocialMediaModule,
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(RequestLoggingMiddleware).forRoutes({
      path: '*',
      method: RequestMethod.ALL,
    });
  }
}
