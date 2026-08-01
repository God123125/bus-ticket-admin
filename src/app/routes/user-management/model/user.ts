import { MongoObject } from '../../../models/mongo-object';

export interface User extends MongoObject {
  address: string;
  profile: string;
  tel: string;
  username: string;
  bank_acc_number: string;
  bank_acc_name: string;
  full_name: string;
}
