import { useState } from "react";
import type { AiChatMessage } from "../types/ai/AiChatMessage";
import type { Exercise } from "../types/exercise/Exercise";
import { ExerciseContext, type AiChatStatus } from "./context/ExerciseContext";
import type { ExerciseChatSectionHandle } from "./ExerciseChatSection";

interface ExerciseProviderProps {
  children: React.ReactNode;
  chatRef: React.RefObject<ExerciseChatSectionHandle | null>;
}

const exercise: Exercise = {
  prompt:
    "Analizza le principali cause del fallimento della campagna di Russia di Napoleone nel 1812, considerando sia i fattori strategici e logistici legati alle decisioni francesi, sia l'impatto delle condizioni ambientali e della resistenza russa.",
  solution: `Il fallimento della campagna di Russia di Napoleone nel 1812 fu un evento catastrofico che segnò l'inizio del declino del suo impero. Le cause furono molteplici e interconnesse, riconducibili a fattori strategici, logistici, ambientali e alla tenace resistenza russa.

1. Fattori Strategici e Logistici (decisioni francesi):
- Eccessiva estensione delle linee di rifornimento: L'esercito napoleonico, la Grande Armata, era composto da oltre 600.000 uomini, il più grande mai assemblato fino ad allora. Avanzando in profondità nel vasto territorio russo, le linee di rifornimento si estesero a dismisura, rendendo estremamente difficile e inefficace l'approvvigionamento di cibo, munizioni e vestiario. I convogli erano lenti, vulnerabili agli attacchi e spesso non riuscivano a raggiungere le truppe in tempo.
- Dipendenza dal foraggiamento: Napoleone contava sul foraggiamento locale per sostenere le sue truppe, una tattica che aveva funzionato in campagne precedenti in territori più densamente popolati e ricchi. La Russia, con le sue vaste aree spopolate e la politica della "terra bruciata" adottata dai russi, rese questa strategia insostenibile. Le risorse erano scarse e spesso distrutte prima dell'arrivo dei francesi.
- Mancanza di una chiara strategia per l'inverno: Nonostante l'esperienza di campagne precedenti, Napoleone non predispose un piano adeguato per affrontare il rigido inverno russo. L'equipaggiamento invernale era insufficiente e l'idea di una campagna rapida che si concludesse prima dell'arrivo del freddo si rivelò un errore fatale.
- Sottovalutazione del nemico: Napoleone sottovalutò la determinazione e la capacità di resistenza dell'esercito e del popolo russo, così come la loro volontà di sacrificare territori pur di non ingaggiare una battaglia decisiva alle condizioni francesi.

2. Impatto delle Condizioni Ambientali:
- Il "Generale Inverno": Il fattore ambientale più devastante fu l'inverno russo. Le temperature estreme, che scesero ben al di sotto dello zero, causarono congelamenti, ipotermia e malattie. Migliaia di soldati morirono di freddo e fame, e cavalli e mezzi di trasporto perirono in massa, paralizzando ulteriormente la logistica.
- Le distanze e il terreno: Le immense distanze da percorrere e la natura del terreno russo (strade spesso fangose o ghiacciate, foreste dense) rallentarono notevolmente l'avanzata e resero estenuante la ritirata.
- Malattie: Le scarse condizioni igieniche, la malnutrizione e il freddo favorirono la diffusione di malattie come il tifo e la dissenteria, che decimarono le truppe più della battaglia stessa.

3. La Resistenza Russa:
- La strategia della "terra bruciata": I russi, sotto la guida del generale Kutuzov, adottarono una strategia di ritirata tattica, evitando lo scontro diretto e distruggendo sistematicamente tutte le risorse (cibo, raccolti, villaggi) lungo il percorso dell'avanzata francese. Questo privò la Grande Armata di rifornimenti essenziali e la costrinse a spingersi sempre più in profondità.
- La battaglia di Borodino: Sebbene una vittoria tattica per i francesi, la battaglia di Borodino fu estremamente sanguinosa e non portò alla distruzione dell'esercito russo, che riuscì a ritirarsi in ordine. Fu una vittoria di Pirro che indebolì ulteriormente le forze napoleoniche.
- La ritirata da Mosca: L'incendio di Mosca, attribuito ai russi, privò Napoleone di un quartiere d'inverno e di una base di rifornimento, costringendolo a iniziare la disastrosa ritirata in pieno inverno.
- Attacchi di guerriglia e cosacchi: Durante la ritirata, le truppe russe regolari e le unità di cosacchi e partigiani harcelarono costantemente la Grande Armata, attaccando i fianchi, i convogli e i soldati isolati, aumentando le perdite e il morale basso.

`,
  evaluationGrid: {
    indicators: [
      {
        label: "Analisi dei fattori strategici e logistici francesi",
        aiDirectives:
          "Valuta se lo studente ha identificato e spiegato correttamente le decisioni strategiche e logistiche errate di Napoleone, come l'estensione delle linee di rifornimento e la dipendenza dal foraggiamento.",
        pointsAvailable: 10,
      },
      {
        label: "Comprensione dell'impatto delle condizioni ambientali",
        aiDirectives:
          "Verifica se lo studente ha descritto accuratamente il ruolo del 'Generale Inverno', delle distanze e delle malattie come cause cruciali del fallimento della campagna.",
        pointsAvailable: 10,
      },
      {
        label:
          "Descrizione della resistenza russa e della strategia della 'terra bruciata'",
        aiDirectives:
          "Accerta che lo studente abbia illustrato efficacemente la strategia russa della 'terra bruciata', l'incendio di Mosca e gli attacchi di guerriglia come elementi determinanti.",
        pointsAvailable: 10,
      },
      {
        label: "Struttura e chiarezza dell'esposizione",
        aiDirectives:
          "Giudica la coerenza logica dell'analisi, la chiarezza espositiva e la capacità dello studente di organizzare le informazioni in modo strutturato e comprensibile.",
        pointsAvailable: 10,
      },
    ],
  },
};

export const ExerciseProvider = ({
  children,
  chatRef,
}: ExerciseProviderProps) => {
  const [aiChatMessages, setAiChatMessages] = useState<AiChatMessage[]>([]);
  const [attempt, setAttempt] = useState("");
  const [chatId, setChatId] = useState("");

  const [aiChatStatus, setAiChatStatus] = useState<AiChatStatus>("ready");

  return (
    <ExerciseContext.Provider
      value={{
        exercise,
        attempt,
        setAttempt,
        ai: {
          chatId,
          setChatId,
          messages: aiChatMessages,
          setMessages: setAiChatMessages,
          chatRef,
          status: aiChatStatus,
          setStatus: setAiChatStatus,
        },
      }}
    >
      {children}
    </ExerciseContext.Provider>
  );
};
