import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AvailabilityModule } from './availability/availability.module';

@Module({
  imports: [AvailabilityModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
