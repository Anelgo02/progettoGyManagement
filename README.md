
# 💪 GyManagement App

**GyManagement** è un'app mobile sviluppata con **Ionic + Angular** per la gestione di una palestra con più personal trainer e clienti.  
Include autenticazione con ruoli (admin, trainer, customer), gestione slot di allenamento, prenotazioni, valutazioni e dashboard personalizzate.

🔗 **[Scarica Docker + Documentazione](https://unipa-my.sharepoint.com/:f:/g/personal/angelo_gulotta01_you_unipa_it/EklnEC5buAhCqPkLD2gkXacBo2bRTA7M9zaBthidqsZGSA?e=FvMYvH)**

---

## 🚀 Funzionalità principali

- Autenticazione e registrazione utenti con ruoli distinti
- Dashboard per ogni tipo di utente
- Creazione, visualizzazione ed eliminazione degli slot (trainer)
- Prenotazione sessioni (customer)
- Sistema di valutazione per i trainer
- Interfaccia responsive e moderna
- Backend Flask (Python) con SQLite, containerizzato via Docker

---

## 🧰 Tecnologie utilizzate

- **Frontend:** Ionic + Angular  
- **Backend:** Flask (Python)  
- **Database:** SQLite  
- **Containerizzazione:** Docker

---

## ⚡ Avvio rapido

### ▶️ Backend

```bash
# Solo al primo avvio
docker compose up --build

# Avvii successivi
docker compose up
```

---

### 💻 Frontend (modalità sviluppo)

1. Modifica i file `environment.ts` e `environment.prod.ts` con l’URL del backend
2. Avvia l’app in modalità sviluppo:

```bash
ionic serve
```

---

### 📱 Deploy su dispositivo Android

1. Assicurati che **PC e dispositivo Android siano sulla stessa rete Wi-Fi**
2. Modifica il file `capacitor.config.ts`:

```ts
server: {
  url: 'http://INDIRIZZO_IP_DEL_PC:8000',
  cleartext: true
}
```

3. Costruisci e sincronizza il progetto:

```bash
ionic build
npx cap sync
npx cap open android
```

4. Avvia con:

```bash
ionic serve --external --host=INDIRIZZO_IP_DEL_PC --port=8000
```

5. Assicurati che l’IP del PC sia incluso tra gli `origins` nel file `server.py`, altrimenti il backend rifiuterà i cookie di sessione:

```python
CORS(app, supports_credentials=True, origins=[
    "http://INDIRIZZO_IP_DEL_PC:8000"
    "http://INDIRIZZO_IP_DEL_PC"
])
```

---

✅ Progetto sviluppato per uso didattico nell’ambito universitario.
```
