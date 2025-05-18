src/
└── app/
    ├── auth/
    │   ├── pages/
    │   │   ├── login.page/          ← Pagina di accesso
    │   │   └── register.page/       ← Pagina di registrazione
    │   └── components/
    │       ├── login-form/          ← Form riutilizzabile per il login
    │       └── register-form/       ← Form riutilizzabile per la registrazione
    │
    ├── client/
    │   ├── pages/
    │   │   ├── client-dashboard.page/  ← Home del cliente
    │   │   └── booking.page/           ← Elenco e gestione prenotazioni
    │   └── components/
    │       └── trainer-card/           ← Card con info sintetiche di un PT
    │
    ├── trainer/
    │   ├── pages/
    │   │   ├── trainer-dashboard.page/ ← Home del PT
    │   │   └── new-slot.page/          ← Form per aprire uno slot di allenamento
    │   └── components/
    │       ├── session-card/           ← Card che riepiloga una sessione
    │       └── slot-form/              ← Form di creazione / modifica slot
    │
    ├── admin/
    │   ├── pages/
    │   │   └── admin-dashboard.page/   ← Pannello riepilogativo dell’admin
    │   └── components/
    │       └── users-table/            ← Tabella gestione utenti (C + PT)
    │
    ├── shared/
    │   ├── components/
    │   │   ├── header/                 ← Barra superiore fissa, mostra ruolo-utente
    │   │   └── rating-stars/           ← Stelline per voto PT
    │   └── pipes/
    │       └── format-date.pipe.ts     ← Pipe che converte ISO → “18 Mag 2025”
    │
    ├── services/
    │   ├── auth.service.ts             ← Login, logout, refresh token, ruoli
    │   ├── user.service.ts             ← CRUD profilo (nome, avatar, email …)
    │   ├── trainer.service.ts          ← Recupero PT, slot, recensioni
    │   ├── booking.service.ts          ← Crea / annulla prenotazioni
    │   └── session.service.ts          ← Gestione sessioni (orari, stato, feedback)
    │
    ├── guards/
    │   ├── auth.guard.ts               ← Blocca non autenticati
    │   ├── admin.guard.ts              ← Consente solo admin
    │   ├── trainer.guard.ts            ← Consente solo PT
    │   └── client.guard.ts             ← Consente solo clienti
    │
    ├── models/                         ← Interfacce TypeScript tipizzate
    │   ├── user.model.ts               ← id, nome, email, ruolo
    │   ├── trainer.model.ts            ← estende user, rating medio, bio
    │   ├── session.model.ts            ← slotId, trainerId, clienteId, stato
    │   ├── booking.model.ts            ← id, sessionId, note, voto
    │   └── review.model.ts             ← testo, stelle, autore, data
    │
    ├── app.routes.ts                   ← Routing centrale (stand-alone)
    └── app.component.ts                ← Root dell’app Ionic



Struttura del progetto che dovremo seguire 
