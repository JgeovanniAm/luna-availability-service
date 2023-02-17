import { Injectable } from '@nestjs/common';
import './config/credentials.json';
import './config/token.json';

@Injectable()
export class AppService {
  getServiceLuna(): string {
    return 'Luz de Luna service';
  }
}
