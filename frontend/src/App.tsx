import { MantineProvider } from "@mantine/core";
import "@mantine/core/styles.css";
import { useMantineProviderTheme } from "./hooks/useMantineProviderTheme";
import ExerciseScreen from "./screens/ExerciseScreen";

function App() {
  const { theme } = useMantineProviderTheme();

  return (
    <MantineProvider theme={theme}>
      <ExerciseScreen />
    </MantineProvider>
  );
}

export default App;
