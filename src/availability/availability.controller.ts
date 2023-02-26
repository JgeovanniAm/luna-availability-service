import { BadRequestException, Body, Controller, Post } from '@nestjs/common';
import { AuthGoogleService } from 'src/auth/auth.service';
import { AvailabilityService } from 'src/availability/availability.service';
import { IReqBodyEvents, IRooms } from 'src/config/interface';

@Controller('availability')
export class AvailabilityController {
  constructor(
    private AvailabilityService: AvailabilityService,
    private AuthGoogleService: AuthGoogleService,
  ) {}

  @Post()
  async checkAvailability(@Body() body: IReqBodyEvents): Promise<IRooms[]> {
    try {
      const auth = await this.AuthGoogleService.authorize();
      if ('min' in body && 'max' in body) {
        return await this.AvailabilityService.getListAvailabelRooms({
          auth,
          body,
        });
      }
      throw new BadRequestException(
        'Payload information from Client side is not correct',
        {
          description: 'We are missing max and min property in body req',
        },
      );
    } catch (error) {
      throw new BadRequestException('Something bad happened', {
        cause: new Error(),
        description: error,
      });
    }
  }
}
