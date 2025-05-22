export interface RegistrationData {
  username: string;
  phone: string;
  full_name: string;
  email: string;
  password: string;
  role: 'customer' | 'trainer';
  specialization?: string;
  trainer_id?: number;
}


