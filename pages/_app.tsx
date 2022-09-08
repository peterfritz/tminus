import type { AppProps } from "next/app";
import { useLocalStorage } from "@mantine/hooks";
import { ModalsProvider } from "@mantine/modals";
import { FaGithub, FaMoon, FaSun } from "react-icons/fa";
import {
  ActionIcon,
  Affix,
  Button,
  ColorScheme,
  MantineProvider,
} from "@mantine/core";

import "../styles/globals.css";

function MyApp({ Component, pageProps }: AppProps) {
  const [colorScheme, setColorScheme] = useLocalStorage<ColorScheme>({
    key: "color-scheme",
    defaultValue: "dark",
    getInitialValueInEffect: true,
  });

  const toggleColorScheme = (value?: ColorScheme) =>
    setColorScheme(value || (colorScheme === "dark" ? "light" : "dark"));

  return (
    <MantineProvider theme={{ colorScheme }} withGlobalStyles withNormalizeCSS>
      <ModalsProvider>
        <Component {...pageProps} />
        <Affix
          position={{
            top: 20,
            left: 20,
          }}
          zIndex={1000}
        >
          <ActionIcon
            variant="default"
            size="lg"
            onClick={() => toggleColorScheme()}
          >
            {colorScheme === "dark" ? <FaSun /> : <FaMoon />}
          </ActionIcon>
        </Affix>
        <Affix
          position={{
            top: 20,
            right: 20,
          }}
          zIndex={1000}
        >
          <Button
            component="a"
            href="https://github.com/peterfritz/tminus"
            rel="noopener"
            target="_blank"
            variant="default"
            leftIcon={<FaGithub size={16} />}
          >
            GitHub
          </Button>
        </Affix>
      </ModalsProvider>
    </MantineProvider>
  );
}

export default MyApp;
