# Step del workshop

In questo documento dettagliamo passo passo come svolgere il workshop.

## Passo 1: api key

In questo passo colleghiamo Gemini alla nostra applicazione Node.js. Per farlo, è necessaria una api key che andrà inserita in `./backend/geminiAi.ts`.

## Passo 2: creazione della chat

Nel costruttore della classe `ExerciseChat.ts` (file `./backend/ExerciseChat.ts`) istanziamo la chat Gemini, che utilizzeremo per guidare lo studente nella risposta alla domanda aperta.

Il system prompt che utilizzeremo è:

`Sei un tutor di uno studente che sta svolgendo una domanda aperta.
Guida lo studente a migliorare la sua risposta attraverso domande stimolo, feedback e suggerimenti senza MAI fornire direttamente la soluzione.

Tono incoraggiante, interattivo e paziente.

Formula domande stimolo basate su concetti chiave mancanti nella risposta dello studente e guidalo verso la soluzione ideale.

L'esercizio è costituito dai seguenti elementi:

1. Domanda
2. Soluzione ideale (non condividerla con lo studente)
3. Risposta dello studente

Domanda:
${this.exercise.prompt}

Soluzione ideale:
${this.exercise.solution}`

## Step 3: metodo sendMessage

In questo passo implementiamo il metodo `sendMessage` della classe `ExerciseChat.ts`, che si occupa di inviare la risposta dello studente alla chat e ricevere le domande stimolo generate da Gemini.

Alla IA inviamo un messaggio con il seguente formato per contestualizzare la sua risposta:

`Risposta alla domanda: ${studentAttempt}`

## Step 4: metodo evaluate

In questo passo implementiamo il metodo `evaluate` della classe `ExerciseChat.ts`, che si occupa di valutare la risposta dello studente e fornire un feedback.

Alla IA inviamo la seguente richiesta:

`Valuta la mia risposta basandoti sulla griglia di valutazione che ti fornirò.
Segui questi step:

1. leggi ogni indicatore della griglia di valutazione:

- il titolo e le direttive indicano come valutare quell'indicatore
- il punteggio massimo indica il massimo numero di punti

2. per ogni indicatore:

- assegna un punteggio da 0 al massimo indicato
- fornisci una breve motivazione per il punteggio assegnato

3. Scrivi un commento finale in cui riassumi la valutazione e mi stimoli a migliorare, usando domande stimolo

Griglia di valutazione:
${JSON.stringify(this.exercise.evaluationGrid.indicators, null, 4)}

Risposta alla domanda:
${studentAttempt}`

E dovrà risponderci seguendo questo schema:

```json
responseJsonSchema: {
  type: "object",
  properties: {
    indicators: {
      type: "array",
      items: {
        type: "object",
        properties: {
          pointsObtained: {
            type: "number",
          },
          reason: {
            type: "string",
          },
        },
        required: ["pointsObtained", "reason"],
      },
    },
    comment: {
      type: "string",
    },
  },
  required: ["indicators", "comment"],
},
```
