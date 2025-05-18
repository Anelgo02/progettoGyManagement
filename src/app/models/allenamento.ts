export interface Allenamento {
  id:          string;
  titolo:      string;
  userId:      string;                // ← nuovo campo
  descrizione: string;
  tipo:        'Cardio' | 'Forza' | 'Stretch';
  data:        string;   // ISO (es. "2025-05-20")
  ora:         string;   // "07:30"
}