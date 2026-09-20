import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HealthController } from './health.controller';
import { MetricsController } from "./metrics/metrics.controller";
import { MetricsModule } from "./metrics/metrics.module";
import { MetricsMiddleware } from './metrics/metrics.middleware';

@Module({
  imports: [MetricsModule],
  controllers: [AppController, HealthController, MetricsController ],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
        .apply(MetricsMiddleware)
        .exclude('metrics')  // не измеряем сам /metrics эндпоинт
        .forRoutes('*');
  }
}
