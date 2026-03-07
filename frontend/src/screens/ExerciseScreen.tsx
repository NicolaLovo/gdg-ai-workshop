import { Box, Flex } from "@mantine/core";
import { useRef } from "react";
import { ExerciseAttemptSection } from "../components/ExerciseAttemptSection";
import {
  ExerciseChatSection,
  type ExerciseChatSectionHandle,
} from "../components/ExerciseChatSection";
import { ExerciseProvider } from "../components/ExerciseProvider";

function ExerciseScreen() {
  const chatRef = useRef<ExerciseChatSectionHandle>(null);

  return (
    <ExerciseProvider chatRef={chatRef}>
      <Box
        style={{
          height: "100vh",
        }}
        px="md"
      >
        <Flex
          direction="row"
          gap="md"
          style={{
            height: "100vh",
          }}
        >
          <Flex
            style={{
              width: "50%",
            }}
            py="md"
          >
            <ExerciseAttemptSection />
          </Flex>

          <Flex
            style={{
              width: "50%",
            }}
            py="md"
          >
            <ExerciseChatSection ref={chatRef} />
          </Flex>
        </Flex>
      </Box>
    </ExerciseProvider>
  );
}

export default ExerciseScreen;
