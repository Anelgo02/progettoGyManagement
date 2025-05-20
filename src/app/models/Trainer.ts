import { User } from "./user";

export interface Trainer extends User {
  specialization: string;
  max_clients_per_slot: number;
  client_count?: number; // opzionale, se fornito dalla dashboard
}
