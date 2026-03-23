import { GoogleGenAI, type Chat } from "@google/genai";
import { BaseChat } from "./tools/BaseChat.js";
import type { EvaluationGridCompiled } from "./types/exercise/EvaluationGridCompiled.js";
import type { Exercise } from "./types/exercise/Exercise.js";

interface ExerciseChatProps {
  exercise: Exercise;
  socketId: string;
}

/**
 * Step 1: inserimento api key
 */
const geminiAi = new GoogleGenAI({
  apiKey: "",
});

export class ExerciseChat extends BaseChat {
  /**
   * Chat instance of Gemini AI
   */
  private chat: Chat;

  constructor(params: ExerciseChatProps) {
    super(params);

    this.chat = geminiAi.chats.create({
      model: "gemini-3-flash-preview",
      config: {
        systemInstruction: `Sei un tutor di uno studente che sta svolgendo una domanda aperta.
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
${this.exercise.solution}`,
      },
    });
  }

  public async sendMessage(
    studentMessage: string,
    studentAttempt: string,
    onChunk: (chunk: string) => void,
  ) {
    const response = await this.chat.sendMessageStream({
      message: [`Risposta alla domanda: ${studentAttempt}`, studentMessage],
    });

    for await (const chunk of response) {
      const resultText = chunk.text ?? "";
      console.log("Chunk: ", resultText);
      onChunk(resultText);
    }

    return;
  }

  public async evaluate(studentAttempt: string): Promise<{
    evaluationGridCompiled: EvaluationGridCompiled;
    comment: string;
  }> {
    const response = await this.chat.sendMessage({
      message: [
        {
          text: `Valuta la mia risposta basandoti sulla griglia di valutazione che ti fornirò.
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
${studentAttempt}`,
        },
      ],
      config: {
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
      },
    });

    const result = JSON.parse(response.text ?? "");

    const evaluationGridCompiled = this.buildEvaluationGridCompiled(
      this.exercise.evaluationGrid,
      result,
    );

    return evaluationGridCompiled;
  }
}
