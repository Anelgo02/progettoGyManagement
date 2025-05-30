# GyManagement App

**GyManagement** è un'applicazione mobile sviluppata con **Ionic + Angular** per la gestione di una palestra con più personal trainer e clienti.  
Supporta autenticazione con ruoli (admin, trainer, customer), prenotazione di sessioni di allenamento, valutazioni dei trainer e gestione degli slot.

## Funzionalità principali
- Login e registrazione utenti con ruoli distinti
- Dashboard personalizzate per trainer e clienti
- Creazione, visualizzazione ed eliminazione degli slot di allenamento
- Sistema di valutazione dei trainer
- Interfaccia responsive e moderna
- Backend in Flask con SQLite (via Docker)

## Tecnologie
- Ionic + Angular
- Flask (Python)
- SQLite
- Docker

## Avvio rapido
```bash
# Avvia il backend
docker compose up

# Avvia il frontend (modalità sviluppo)
ionic serve
