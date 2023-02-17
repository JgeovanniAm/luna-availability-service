import { promises as fs } from 'fs';
import { authenticate } from '@google-cloud/local-auth';
import { Injectable } from '@nestjs/common';
import { google } from 'googleapis';
import path from 'path';
import { ConfigService } from '@nestjs/config';
import { JSONClient } from 'google-auth-library/build/src/auth/googleauth';
import { OAuth2Client } from 'google-auth-library';

@Injectable()
export class AuthGoogleService {
  private TOKEN_PATH: string;
  private CREDENTIALS_PATH: string;
  private SCOPES: string[];

  constructor(private configService: ConfigService) {
    this.SCOPES = ['https://www.googleapis.com/auth/calendar.readonly'];
    this.TOKEN_PATH = path.join(
      process.cwd(),
      this.configService.get<string>('TOKEN_PATH'),
    );
    this.CREDENTIALS_PATH = path.join(
      process.cwd(),
      this.configService.get<string>('CREDENTIALS_PATH'),
    );
  }

  private async loadSavedCredentialsIfExist() {
    try {
      const content = await fs.readFile(this.TOKEN_PATH);
      const credentials = JSON.parse(content.toString());
      return google.auth.fromJSON(credentials);
    } catch (err) {
      return null;
    }
  }

  public async authorize(): Promise<JSONClient | OAuth2Client> {
    const client = await this.loadSavedCredentialsIfExist();
    if (client) {
      return client;
    }
    //return null;
    const crede = await authenticate({
      scopes: this.SCOPES,
      keyfilePath: this.CREDENTIALS_PATH,
    });
    if (crede.credentials) {
      await this.saveCredentials(client);
    }
    return crede;
  }

  private async saveCredentials(client) {
    const content = await fs.readFile(this.CREDENTIALS_PATH);
    const keys = JSON.parse(content.toString());
    const key = keys.installed || keys.web;
    const payload = JSON.stringify({
      type: 'authorized_user',
      client_id: key.client_id,
      client_secret: key.client_secret,
      refresh_token: client.credentials.refresh_token,
    });
    await fs.writeFile(this.TOKEN_PATH, payload);
  }
}
