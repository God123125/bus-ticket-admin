import { MongoObject } from '../../../models/mongo-object';

export interface Geographic extends MongoObject {
  name_kh: string;
  name_en: string;
}
