import { MongoObject } from '../../../models/mongo-object';
import { Bus } from '../../bus/model/bus';
import { Schedule } from '../../schedule/model/schedule';

export interface Trip extends MongoObject {
  bus: Bus;
  schedule: Schedule;
  departure_date: Date;
  price_per_seat: number;
  image: string;
  amenities: string[];
  booked_seats: string[];
}
