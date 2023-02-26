import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class CredentialsService {
  constructor(private configService: ConfigService) {}

  get credentials() {
    return {
      installed: {
        client_id: this.configService.get<string>('CLIENT_ID'),
        project_id: this.configService.get<string>('PROJECT_ID'),
        auth_uri: this.configService.get<string>('AUTH_URI'),
        token_uri: this.configService.get<string>('TOKEN_URI'),
        auth_provider_x509_cert_url: this.configService.get<string>(
          'AUTH_PROVIDER_X509_CERT_URL',
        ),
        client_secret: this.configService.get<string>('CLIENT_SECRET'),
        redirect_uris: [this.configService.get<string>('REDIRECT_URIS')],
      },
    };
  }

  get token() {
    return {
      type: 'authorized_user',
      client_id: this.configService.get<string>('CLIENT_ID'),
      client_secret: this.configService.get<string>('CLIENT_SECRET'),
      refresh_token: this.configService.get<string>('REFRESH_TOKEN'),
    };
  }
}
