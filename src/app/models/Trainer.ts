import { User } from "./user";

export interface Trainer extends User {
  specialization: string;
  max_clients_per_slot: number;
  client_count?: number;
  avg_rating?: number;
  rating_count?:  number; 
}
