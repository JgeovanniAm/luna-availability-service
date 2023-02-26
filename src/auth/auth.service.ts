import { Injectable } from '@nestjs/common';
import { google } from 'googleapis';
import { JSONClient } from 'google-auth-library/build/src/auth/googleauth';
import { OAuth2Client } from 'google-auth-library';
import { CredentialsService } from './credentials.service';

@Injectable()
export class AuthGoogleService {
  constructor(private credentials: CredentialsService) {}

  private async loadSavedCredentialsIfExist() {
    try {
      return google.auth.fromJSON(this.credentials.token);
    } catch (err) {
      return null;
    }
  }

  public async authorize(): Promise<JSONClient | OAuth2Client> {
    const client = await this.loadSavedCredentialsIfExist();
    if (client) {
      return client;
    }
    return null;
  }
}
