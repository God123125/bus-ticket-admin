import { MongoObject } from '../../../models/mongo-object';

export interface User extends MongoObject {
  address: string;
  profile: string;
  tel: string;
  username: string;
}
