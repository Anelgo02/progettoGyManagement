export interface User {
  id: number;
  username: string;
  email: string;
  password: string;
  nome?: string;
  cognome?: string;
  role?: string;
  full_name: string; 
}