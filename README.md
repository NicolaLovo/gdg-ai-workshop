# Google Developer Groups Ai workshop

Questa repository contiene il codice per il Workshop di Google Developer Groups su AI e Gemini.

## Prerequisiti

- `node.js` >= 22
- `npm` >= 10
- `git`

## Struttura del progetto

Il progetto è diviso in due cartelle principali:

- `backend`: contiene il codice del server, che gestisce le richieste API e l'integrazione con Gemini
- `frontend`: contiene il codice del client, che fornisce l'interfaccia utente per interagire con il backend

Per questo progetto è necessario avere una API key di Gemini.

Nel branch `main` è presente il template del progetto, che sarà la base per il workshop. Nella branch `solution` è presente la soluzione completa, che sarà mostrata alla fine del workshop.

## Setup

Clone della repository:

```
git clone https://github.com/NicolaLovo/gdg-ai-workshop.git
```

Setup del backend:

```sh
cd ./backend
npm install
```

Setup del frontend:

```sh
cd ./frontend
npm install
```

Esecuzione del backend:

```sh
cd ./backend
npm run dev
```

Esecuzione del frontend:

```sh
cd ./frontend
npm run dev
```
