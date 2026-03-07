import { Flex, Table, Text, useMantineTheme } from "@mantine/core";
import type { EvaluationGridCompiled } from "../../types/exercise/EvaluationGridCompiled";
import { MarkdownParser } from "../atoms/MarkdownParser";

interface AiChatEvaluationMessageProps {
  evaluationGridCompiled: EvaluationGridCompiled;
  comment: string;
}

export const AiChatEvaluationMessage = ({
  evaluationGridCompiled,
  comment,
}: AiChatEvaluationMessageProps) => {
  const theme = useMantineTheme();

  return (
    <Flex direction="column" gap="xs">
      <Table withColumnBorders withRowBorders withTableBorder>
        <Table.Thead>
          <Table.Tr>
            <Table.Th>Titolo</Table.Th>
            <Table.Th>Motivo</Table.Th>
            <Table.Th>
              <Flex
                style={{
                  width: "50px",
                  // backgroundColor: "red",
                }}
                direction="column"
                align="center"
                justify="center"
              >
                Punti
              </Flex>
            </Table.Th>
          </Table.Tr>
        </Table.Thead>

        <Table.Tbody>
          {evaluationGridCompiled.indicators.map((indicator, index) => {
            return (
              <Table.Tr key={index}>
                <Table.Td>{indicator.label}</Table.Td>
                <Table.Td>{indicator.reason}</Table.Td>
                <Table.Td>
                  <Flex
                    style={{
                      width: "50px",
                      // backgroundColor: "red",
                    }}
                    direction="column"
                    align="center"
                    justify="center"
                  >
                    <Text>
                      {indicator.pointsObtained} / {indicator.pointsAvailable}
                    </Text>
                  </Flex>
                </Table.Td>
              </Table.Tr>
            );
          })}
        </Table.Tbody>
      </Table>

      <MarkdownParser md={comment} />
    </Flex>
  );
};
