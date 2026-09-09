import { Trip } from '../../trip/model/trip';

export interface FiveRecentBookings {
  booked_seats: string[];
  total_price: number;
  status: string;
  trip: Trip;
  user_info: {
    name: string;
    email: string;
    phone_number: string;
  };
}
