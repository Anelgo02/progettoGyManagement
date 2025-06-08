# GyManagement App

**GyManagement** è un'applicazione mobile sviluppata con **Ionic + Angular** per la gestione di una palestra con più personal trainer e clienti.  
Supporta autenticazione con ruoli (admin, trainer, customer), prenotazione di sessioni di allenamento, valutazioni dei trainer e gestione degli slot.

Per scaricare il docker e la documentazione: https://unipa-my.sharepoint.com/:f:/g/personal/angelo_gulotta01_you_unipa_it/EklnEC5buAhCqPkLD2gkXacBo2bRTA7M9zaBthidqsZGSA?e=FvMYvH

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

## Avvio rapido(istruzioni per l'uso)
```bash

# Avvia il backend
(Nel caso in cui sia il primo avvio: docker compose up --build)
docker compose up



# Avvia il frontend (modalità sviluppo)
modificare nei file enviroment l'URL per comunicare con l'API
poi fare ionic serve

# Qualora si voglia iniettare l'apk in un dispositivo android e testare l'app:
modificare nel file capacitor l'url con quello del computer (dispositivo e computer devono essere collegati alla stessa rete)
dopodichè:

ionic build
npx cap sync
npx cap open android

Infine fare il debug sul dispositivo ricordando di:
-usare il comando ionic serve --external --host:indirizzo_ip del pc --port:8000
-aggiungere l'indirizzo ip del pc nella sezione origins del file server.py per accettare come origine, così il backend utilizzerà autorizzerà i cookies
