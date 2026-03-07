import { useMantineTheme } from "@mantine/core";
import { MarkdownParser } from "../atoms/MarkdownParser";

interface AiChatAssistantTextMessageProps {
  content: string;
}

export const AiChatAssistantTextMessage = ({
  content,
}: AiChatAssistantTextMessageProps) => {
  const theme = useMantineTheme();

  return <MarkdownParser md={content} />;
};
