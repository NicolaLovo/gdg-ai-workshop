import { Card, type MantineTheme } from "@mantine/core";

export const useMantineProviderComponents = () => {
  const components: MantineTheme["components"] = {
    Card: Card.extend({
      defaultProps: {
        withBorder: true,
        radius: "sm",
        p: "sm",
      },
    }),
  };

  return { components };
};
