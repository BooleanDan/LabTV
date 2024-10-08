
<img width="500" alt="Screenshot 2023-12-05 alle 12 24 49" src="https://github.com/BooleanDan/LabTV/assets/144498896/daa1161a-8741-49be-80e6-8bb7f22fffef">

# Progetto di Streaming - Seconda Prova Pratica LABFORTRAINING

## Descrizione del Progetto
Questo progetto è stato sviluppato come seconda prova pratica per il corso **LABFORTRAINING**. L'obiettivo era la creazione di un sito web di streaming utilizzando il framework **Angular**. Il sito consente la visualizzazione di film tramite una lista interattiva, la gestione del login e dell'utenza, nonché la simulazione di un carrello per l'acquisto di film.

### Funzionalità Implementate:
- **Binding Angular**:
  - Interpolazione
  - Property binding
  - Event binding
  - Two-way binding
- **Direttive**:
  - Strutturali: `*ngFor`, `*ngIf`, `*ngSwitch`
  - Di attributo: `ngStyle`, `ngClass`
- **Data Sharing** tra Components usando `@Input()` e `@Output()`
- **Routing** per la navigazione tra le varie sezioni del sito (menu e funzionalità)
- Utilizzo di **Angular Services** per gestire task condivisi tra più Components
- **Chiamate HTTP Ajax** (GET/POST) a Web Services/API esterne
- **Gestione utenza e login** con autenticazione tramite un server REST API locale
- Simulazione di aggiunta di un film al carrello e acquisto

### API Utilizzate
Per la lista dei film è stata utilizzata l'API **TMDB (The Movie Database)**, disponibile al seguente indirizzo:  
[https://api.themoviedb.org](https://api.themoviedb.org)

### Librerie Esterne
- **SweetAlert2**: utilizzata per la gestione dei modali, come conferme, messaggi di errore e notifiche all'utente.

## Requisiti
Per eseguire il progetto, è necessario avere installato:
- Node.js (>= v12)
- Angular CLI
- Un Web Server REST API per la gestione del login e della registrazione utenti

## Installazione
1. Clonare il repository:
   ```bash
   git clone https://github.com/username/repository-name.git
   ```
2. Entrare nella directory del progetto:
   ```bash
   cd repository-name
   ```
3. Installare le dipendenze:
   ```bash
   npm install
   ```
4. Avviare il server di sviluppo:
   ```bash
   ng serve
   ```
   Il sito sarà disponibile all'indirizzo `http://localhost:4200`.

5. Configurare il REST API Web Server per la gestione del login seguendo le istruzioni nel file `server/README.md`.

## Utilizzo
- Navigare nel sito per visualizzare i film tramite l'API di TMDB.
- Effettuare il login per simulare l'acquisto di un film.
- Aggiungere film al carrello e procedere con la simulazione dell'acquisto.

## Struttura del Progetto
- `/src/app`: Contiene i components, servizi e moduli principali.
- `/server`: Contiene il codice per il server REST API per la gestione dell'autenticazione.

## Contributi
Se desideri contribuire al progetto, apri una **pull request** o segnala eventuali problemi attraverso la sezione **issues**.

## Licenza
Questo progetto è distribuito sotto la licenza MIT. Per maggiori informazioni, consulta il file [LICENSE](LICENSE).

