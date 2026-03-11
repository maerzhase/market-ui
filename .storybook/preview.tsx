import { DocsContainer } from "@storybook/addon-docs/blocks";
import { withThemeByClassName } from "@storybook/addon-themes";
import type { Preview, ReactRenderer } from "@storybook/react-vite";
import { useEffect, useMemo, useState } from "react";
import { dark, light } from "./theme";
import "../src/styles/index.css";
import "./preview.css";

const ThemedDocsContainer = ({ children, context }) => {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const el = document?.documentElement;
    if (!el) return;

    setIsDark(el.classList.contains("dark"));

    const obs = new MutationObserver(() =>
      setIsDark(el.classList.contains("dark")),
    );
    obs.observe(el, { attributes: true, attributeFilter: ["class"] });
    return () => obs.disconnect();
  }, []);

  const theme = useMemo(() => (isDark ? dark : light), [isDark]);

  return (
    <DocsContainer context={context} theme={theme}>
      {children}
    </DocsContainer>
  );
};

const preview: Preview = {
  tags: ["autodocs"],
  decorators: [
    withThemeByClassName<ReactRenderer>({
      themes: { light: "", dark: "dark" },
      defaultTheme: "dark",
    }),
  ],
  parameters: {
    docs: { container: ThemedDocsContainer },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
};

export default preview;
