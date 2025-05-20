export interface Booking {
  id: number;
  customer_id: number;
  slot_id: number;
  booking_date: string;
  status: string; // ad esempio: 'confermata', 'annullata', ecc.
}