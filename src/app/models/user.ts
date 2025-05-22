export interface User {
  uid: string;
  username: string;
  email: string;
  password: string;
  nome?: string;
  cognome?: string;
  role?: string;
  full_name: string; 
}