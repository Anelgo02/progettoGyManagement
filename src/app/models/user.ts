export interface User {
  uid: string;
  username: string;
  email: string;
  password: string;
  nome?: string;
  cognome?: string;
  ruolo?: string; // ad esempio: 'cliente', 'admin', ecc.
}