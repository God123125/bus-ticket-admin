import { MongoObject } from '../../../models/mongo-object';
import { Station } from '../../station/model/station';
import { Company } from '../../company/model/company';

export interface Schedule extends MongoObject {
  from: string;
  to: string;
  departure_time: string;
  arrival_time: string;
  departure_station: Station;
  arrival_station: Station;
  company?: string | Company;
  description?: string;
  image?: string;
}
