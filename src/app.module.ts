import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AvailabilityModule } from './availability/availability.module';
import { RoomsModule } from './rooms/rooms.module';

@Module({
  imports: [AvailabilityModule, RoomsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
