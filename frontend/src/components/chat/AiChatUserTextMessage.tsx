import { Card, useMantineTheme } from "@mantine/core";

interface AiChatUserTextMessageProps {
  content: string;
}

export const AiChatUserTextMessage = ({
  content,
}: AiChatUserTextMessageProps) => {
  const theme = useMantineTheme();

  return (
    <Card
      style={{
        borderRadius: `${theme.spacing.md} 0px ${theme.spacing.md} ${theme.spacing.md}`,
        backgroundColor: theme.colors.gray[2],
      }}
    >
      {content}
    </Card>
  );
};
