import { MongoObject } from '../../../models/mongo-object';
import { Company } from '../../company/model/company';

export interface Bus extends MongoObject {
  model_name: string;
  plate_number: string;
  description: string;
  type: string;
  company: string | Company;
  row: number;
}
