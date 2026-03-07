import {
  Button,
  Card,
  Divider,
  Flex,
  Modal,
  ScrollArea,
  Textarea,
  Title,
  useMantineTheme,
} from "@mantine/core";
import { useState } from "react";
import { useExerciseContext } from "./context/ExerciseContext";

interface ExerciseAttemptSectionProps {}

export const ExerciseAttemptSection = ({}: ExerciseAttemptSectionProps) => {
  const {} = useExerciseContext();

  const {
    attempt,
    setAttempt,
    exercise,
    ai: { chatRef },
  } = useExerciseContext();

  const [showModal, setShowModal] = useState(false);

  const theme = useMantineTheme();

  return (
    <ScrollArea>
      <Flex direction="column" gap="md" w="100%">
        <Card>
          <Card.Section>
            <Flex p="md">
              <Title>Domanda</Title>
            </Flex>
            <Divider />
          </Card.Section>
          <Flex gap="md" direction="column" mt="md">
            {exercise.prompt}

            <Flex direction="row" justify="flex-end">
              <Button onClick={() => setShowModal(true)}>
                Mostra soluzione
              </Button>

              <Modal
                opened={showModal}
                onClose={() => setShowModal(false)}
                title={<Title>Soluzione</Title>}
                size="90%"
                centered
              >
                <pre
                  style={{
                    whiteSpace: "pre-wrap",
                    wordWrap: "break-word",
                    overflowWrap: "anywhere",
                    fontFamily: theme.fontFamily,
                    lineHeight: "21px",
                  }}
                >
                  {exercise.solution}
                </pre>
              </Modal>
            </Flex>
          </Flex>
        </Card>

        <Card>
          <Card.Section>
            <Flex p="md">
              <Title>Risposta</Title>
            </Flex>
            <Divider />
          </Card.Section>
          <Flex gap="md" direction="column" mt="md">
            <Textarea
              value={attempt}
              onChange={(event) => setAttempt(event.currentTarget.value)}
              placeholder="Risposta..."
              minRows={2}
              autosize
              styles={{
                input: {
                  border: "none",
                },
              }}
            />

            <Flex direction="row" justify="flex-end">
              <Button onClick={() => chatRef.current?.evaluate()}>
                Valuta
              </Button>
            </Flex>
          </Flex>
        </Card>
      </Flex>
    </ScrollArea>
  );
};
