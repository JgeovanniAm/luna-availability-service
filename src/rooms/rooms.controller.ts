import { Controller, Get, Param } from '@nestjs/common';
import { RoomsService } from 'src/rooms/rooms.service';

@Controller('rooms')
export class RoomsController {
  constructor(readonly RoomsService: RoomsService) {}
  @Get('/:id')
  findRoom(@Param() params) {
    return this.RoomsService.findRoom(params.id);
  }
}
