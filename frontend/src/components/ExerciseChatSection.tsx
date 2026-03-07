import {
  ActionIcon,
  Card,
  Divider,
  Flex,
  Loader,
  ScrollArea,
  Skeleton,
  Text,
  Textarea,
  Title,
} from "@mantine/core";
import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import { MdArrowForward } from "react-icons/md";
import type { ApiAiChatHandle } from "../api/ApiAiChatHandle";
import { useApiClient } from "../hooks/useApiClient";
import type { AiChatMessage } from "../types/ai/AiChatMessage";
import { AiChatAssistantTextMessage } from "./chat/AiChatAssistantTextMessage";
import { AiChatEvaluationMessage } from "./chat/AiChatEvaluationMessage";
import { AiChatUserTextMessage } from "./chat/AiChatUserTextMessage";
import { useExerciseContext } from "./context/ExerciseContext";

interface ExerciseChatSectionProps {}
export interface ExerciseChatSectionHandle {
  evaluate: () => void;
}

export const ExerciseChatSection = forwardRef<
  ExerciseChatSectionHandle,
  ExerciseChatSectionProps
>(({}, ref) => {
  const {} = useExerciseContext();

  const {
    attempt,
    exercise,
    ai: { messages, setMessages, status, setStatus, chatId, setChatId },
  } = useExerciseContext();

  const [customPrompt, setCustomPrompt] = useState("");

  const aiChatHandle = useRef<ApiAiChatHandle | null>(null);

  const [loading, setLoading] = useState(true);

  const { apiClient } = useApiClient();

  const scrollAreaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    //autoscroll to bottom of output window
    scrollAreaRef.current?.scrollTo({
      top: scrollAreaRef.current?.scrollHeight,
      behavior: "smooth",
    });
  }, [scrollAreaRef, messages]);

  useEffect(() => {
    const init = async () => {
      setLoading(true);
      const { handle } = await apiClient.connectExerciseChat({
        exercise,
      });
      aiChatHandle.current = handle;
      setChatId(handle.chatId);
      setLoading(false);
    };

    init();

    return () => {
      // disconnect the socket connection when the component unmounts
      aiChatHandle.current?.disconnect();
    };
  }, []);

  useImperativeHandle(ref, () => ({
    async evaluate() {
      if (!aiChatHandle.current) return;
      if (status === "streaming") return;

      const userMessage: AiChatMessage = {
        role: "user",
        type: "text",
        content: "Valuta la mia risposta",
      };

      setMessages((prev) => [...prev, userMessage]);

      setStatus("streaming");
      const evaluateRes = await aiChatHandle.current.evaluate({
        params: {
          attempt,
        },
      });
      setMessages((prev) => [...prev, evaluateRes.message]);
      setStatus("ready");
    },
  }));

  const onMessageSend = async () => {
    if (!aiChatHandle.current) return;
    if (status === "streaming") return;
    if (customPrompt.trim() === "") return;

    setStatus("streaming");

    const userMessage: AiChatMessage = {
      role: "user",
      type: "text",
      content: customPrompt.trim(),
    };

    const emptyAssistantMessage: AiChatMessage = {
      role: "assistant",
      type: "text",
      content: "",
    };

    setMessages((prev) => [...prev, userMessage, emptyAssistantMessage]);
    setCustomPrompt("");

    await aiChatHandle.current.sendMessage({
      params: { attempt: attempt, message: customPrompt.trim() },
      onChunk: (chunk) => {
        setMessages((prev) => {
          const lastMessage = prev[prev.length - 1];
          if (
            !lastMessage ||
            lastMessage.type !== "text" ||
            lastMessage.role !== "assistant"
          ) {
            return [
              ...prev,
              {
                role: "assistant",
                type: "text",
                content: chunk.text,
              } as AiChatMessage,
            ];
          }

          const updatedLastMessage = {
            ...lastMessage,
            content: lastMessage.content + chunk.text,
          };

          return [...prev.slice(0, -1), updatedLastMessage];
        });
      },
    });

    setStatus("ready");
  };

  if (loading) {
    return (
      <Flex direction="column" gap="md" w="100%">
        <Skeleton h={100} w="100%" />
        <Skeleton h={100} w="100%" />
        <Skeleton h={100} w="100%" />
      </Flex>
    );
  }

  return (
    <Card
      w="100%"
      style={{
        height: "100%",
      }}
    >
      <Card.Section>
        <Flex direction="column" p="md">
          <Title>Tutor AI</Title>
          <Text mt={4}>Chat id: {chatId}</Text>
        </Flex>
        <Divider />
      </Card.Section>
      <ScrollArea viewportRef={scrollAreaRef}>
        <Flex direction="column" w="100%" mt="md">
          <Flex direction="column" gap="md">
            {messages.map((message, index) => {
              switch (message.type) {
                case "text": {
                  if (message.role === "user") {
                    return (
                      <React.Fragment key={index}>
                        <Flex direction="row" justify="flex-end">
                          <AiChatUserTextMessage content={message.content} />
                        </Flex>
                      </React.Fragment>
                    );
                  }

                  return (
                    <React.Fragment key={index}>
                      <AiChatAssistantTextMessage content={message.content} />
                    </React.Fragment>
                  );
                }
                case "evaluation": {
                  return (
                    <React.Fragment key={index}>
                      <AiChatEvaluationMessage
                        evaluationGridCompiled={message.evaluationGridCompiled}
                        comment={message.comment}
                      />
                    </React.Fragment>
                  );
                }
              }
            })}

            {status === "streaming" && (
              <Flex direction="row" justify="center">
                <Loader size="lg" type="dots" />
              </Flex>
            )}
            <Card>
              <Flex direction="row" align="flex-end" gap="xs">
                <Textarea
                  value={customPrompt}
                  onChange={(event) =>
                    setCustomPrompt(event.currentTarget.value)
                  }
                  placeholder="Come posso aiutarti?"
                  minRows={1}
                  maxRows={8}
                  autosize
                  style={{
                    flex: 1,
                  }}
                  styles={{
                    input: {
                      border: "none",
                      padding: 0,
                    },
                  }}
                />
                <Flex
                  direction="column"
                  justify="flex-end"
                  style={{
                    flexShrink: 0,
                  }}
                >
                  <ActionIcon
                    onClick={onMessageSend}
                    disabled={
                      status === "streaming" || customPrompt.trim() === ""
                    }
                    style={{
                      borderRadius: "100px",
                    }}
                    size={34}
                  >
                    <MdArrowForward size={20} />
                  </ActionIcon>
                </Flex>
              </Flex>
            </Card>
          </Flex>
        </Flex>
      </ScrollArea>
    </Card>
  );
});
