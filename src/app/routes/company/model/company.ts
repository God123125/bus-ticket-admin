import { MongoObject } from '../../../models/mongo-object';
import { User } from '../../user-management/model/user';

export interface Company extends MongoObject {
  name: string;
  rating: number;
  is_active: boolean;
  image: string;
  owner: string & User;
  commission_fee: number;
  color?: string;
}
