import { JSONClient } from 'google-auth-library/build/src/auth/googleauth';
import { OAuth2Client } from 'google-auth-library';

export interface IbodyAvailabilityService {
  auth: JSONClient | OAuth2Client;
  body: IReqBodyEvents;
}

export interface IReqBodyEvents {
  max: string;
  min: string;
}

export interface IRooms {
  the1: The1;
  the2: The1;
  the3: The1;
  the4: The1;
  the5: The1;
  the6: The1;
  the7: The1;
  the8: The1;
}

export interface The1 {
  name: string;
  maxPersons: number;
  bedL: BedL;
  bedS: number;
  bathroomPrivate: boolean;
  terraceDNDHammock: boolean;
  miniRefrigerator: boolean;
  airConditioner: boolean;
  fan: boolean;
  price: null;
  kitchen?: boolean;
}

export interface BedL {
  count: number;
  mezanine: boolean;
  privateRoom: boolean;
}
