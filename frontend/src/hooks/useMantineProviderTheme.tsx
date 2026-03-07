import { createTheme, DEFAULT_THEME, rem } from "@mantine/core";
import { useMantineProviderComponents } from "./useMantineProviderComponents";

export const useMantineProviderTheme = () => {
  const { components } = useMantineProviderComponents();
  const theme = createTheme({
    components,
    scale: 1,
    primaryColor: "blue",
    white: DEFAULT_THEME.white,
    black: DEFAULT_THEME.colors.gray[8],
    headings: {
      sizes: {
        h1: {
          fontSize: rem(20),
        },
      },
    },
    fontSizes: {
      md: rem(14),
      sm: rem(14),
      xs: rem(12),
    },
    fontFamily: "Plus Jakarta Sans",
  });

  return {
    theme,
  };
};
