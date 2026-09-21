export interface BookingReport {
  list: any[];
  cancelledBookingCount: number;
  confirmedBookingCount: number;
  pendingBookingCount: number;
  refundedBookingCount: number;
  totalBookingAmount: number;
  totalBookingCount: number;
}
