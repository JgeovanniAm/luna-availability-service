import { Injectable } from '@nestjs/common';
// import cred

@Injectable()
export class AppService {
  getServiceLuna(): string {
    return 'Luz de Luna service';
  }
}
