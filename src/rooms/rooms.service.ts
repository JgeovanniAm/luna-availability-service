import { Injectable } from '@nestjs/common';
import { IRooms } from 'src/config/const';

import data from '../data/hotel.json';

@Injectable()
export class RoomsService {
  findRoom(id: string): IRooms | undefined[] {
    const prop = `#${id}`;
    if (prop in data) {
      return data[`#${id}`];
    }
    return [];
  }
}
