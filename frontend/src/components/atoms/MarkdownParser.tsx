import { Typography, useMantineTheme } from "@mantine/core";
import MarkdownPreview, {
  type MarkdownPreviewProps,
} from "@uiw/react-markdown-preview";

interface MarkdownParserProps extends Partial<MarkdownPreviewProps> {
  md: string;
}

export const MarkdownParser = ({ md, ...rest }: MarkdownParserProps) => {
  const theme = useMantineTheme();

  return (
    <Typography pl={0}>
      <MarkdownPreview
        {...rest}
        source={md}
        rehypeRewrite={(node, index, parent) => {
          //  https://www.npmjs.com/package/@uiw/react-markdown-preview#disable-header-links
          if (
            (node as any)?.tagName === "a" &&
            parent &&
            /^h(1|2|3|4|5|6)/.test((parent as any)?.tagName)
          ) {
            parent.children = parent.children.slice(1);
          }
        }}
        style={{
          // padding: theme.spacing.xs,
          borderRadius: theme.radius.sm,
          fontFamily: theme.fontFamily,
          fontSize: theme.fontSizes.sm,
          backgroundColor: theme.white,

          ...rest.style,
        }}
      />
    </Typography>
  );
};
