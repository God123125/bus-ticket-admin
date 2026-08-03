import { MongoObject } from '../../../models/mongo-object';

export interface Station extends MongoObject {
  station_name: string;
  latitude: number;
  longitude: number;
}
