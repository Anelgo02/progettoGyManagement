export interface User {
  uid: string;
  email: string;
  password: string;
  nome?: string;
  cognome?: string;
  ruolo?: string; // ad esempio: 'cliente', 'admin', ecc.
}