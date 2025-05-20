export interface TrainingSlot {
  id: number;
  trainer_id: number;
  start_time: string;
  end_time: string;
  max_clients: number;
}