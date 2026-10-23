import { MongoObject } from '../../../models/mongo-object';

export interface PromoCode extends MongoObject {
  code: string;
  discountType: string;
  value: number;
  is_active: boolean;
  expiresAt: Date;
  maxUses: number;
}
