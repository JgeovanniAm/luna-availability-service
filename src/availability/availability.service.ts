import { Injectable } from '@nestjs/common';
import { calendar_v3, google } from 'googleapis';
import {
  IbodyAvailabilityService,
  IReqBodyEvents,
  IRooms,
} from 'src/config/interface';

import data from '../data/hotel.json';

@Injectable()
export class AvailabilityService {
  async getListAvailabelRooms({
    auth,
    body,
  }: IbodyAvailabilityService): Promise<IRooms[]> {
    const calendar = google.calendar({ version: 'v3', auth });
    const events = await this.checkEventsCalendar(calendar, body);
    return await this.filterAvailableRooms(events);
  }

  private async filterAvailableRooms(events): Promise<IRooms[]> {
    const regex = /\#\d*/gm;

    if (!events || events.length === 0) {
      return Object.keys(data)?.map((item) => data[item]);
    }

    const filterRooms = Object.keys(data)?.reduce(
      (arr: IRooms[], item: string): IRooms[] => {
        if (
          !events.some(
            (event: calendar_v3.Schema$Events) =>
              item == event.summary.match(regex)[0],
          )
        ) {
          arr = [...arr, data[item]];
        }
        return arr;
      },
      [],
    );
    return filterRooms;
  }

  private async checkEventsCalendar(
    calendar: calendar_v3.Calendar,
    body: IReqBodyEvents,
  ): Promise<calendar_v3.Schema$Events[]> {
    const res = await calendar.events.list({
      calendarId: 'primary',
      timeMax: body.max, // increment one day more from the user logic component
      timeMin: body.min,
      showDeleted: false,
      singleEvents: true,
      maxResults: 10,
      orderBy: 'startTime',
    });
    return res.data.items;
  }
}
