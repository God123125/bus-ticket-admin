import { MongoObject } from '../../../models/mongo-object';
import { Station } from '../../station/model/station';
import { Company } from '../../company/model/company';
import { Geographic } from '../../geographic/model/geographic';

export interface Schedule extends MongoObject {
  from: Geographic;
  to: Geographic;
  departure_time: string;
  arrival_time: string;
  departure_station: Station;
  arrival_station: Station;
  company?: string | Company;
  description?: string;
  image?: string;
}
