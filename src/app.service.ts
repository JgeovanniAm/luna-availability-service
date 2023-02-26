import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getServiceLuna(): string {
    return 'Luz de Luna service';
  }
}
