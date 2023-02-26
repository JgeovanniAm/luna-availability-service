import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthGoogleService } from 'src/auth/auth.service';
import { CredentialsService } from 'src/auth/credentials.service';
import { AvailabilityController } from './availability.controller';
import { AvailabilityService } from './availability.service';

@Module({
  controllers: [AvailabilityController],
  providers: [AvailabilityService, AuthGoogleService, CredentialsService],
  imports: [ConfigModule.forRoot()],
})
export class AvailabilityModule {}
