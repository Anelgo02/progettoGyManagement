import { User } from "./user";

export interface Customer extends User {
  join_date: string;
  trainer_id?: number;
  trainer_name?: string;
}
