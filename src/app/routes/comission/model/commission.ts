import { MongoObject } from '../../../models/mongo-object';

export interface Commission extends MongoObject {
  company_name: string;
  company_image: string;
  company_owner: {
    profile: string;
    full_name: string;
    username: string;
    tel: string;
  };
  total_commission: number;
  status: string;
}
export interface StatusCount {
  paid: number;
  pending: number;
}
