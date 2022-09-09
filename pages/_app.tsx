import type { AppProps } from "next/app";
import { useHotkeys, useLocalStorage } from "@mantine/hooks";
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
import { useEffect } from "react";
import { useRouter } from "next/router";

function MyApp({ Component, pageProps }: AppProps) {
  const [colorScheme, setColorScheme] = useLocalStorage<ColorScheme>({
    key: "color-scheme",
    defaultValue: "dark",
    getInitialValueInEffect: true,
  });

  const router = useRouter();

  const toggleColorScheme = (value?: ColorScheme) =>
    setColorScheme(value || (colorScheme === "dark" ? "light" : "dark"));

  useHotkeys([["mod+shift+X", () => router.push("/admin")]]);

  useEffect(() => {
    console.log(
      "By %cptr",
      `background: linear-gradient(to right, #FF033E 0%, #FA0442 4.7%, #F40646 8.9%, #ED084C 12.8%, #E60A52 16.56%, #DC0C58 20.37%, #D20F61 24.4%, #C5136A 28.83%, #B71675 33.84%, #A61B82 39.6%, #932091 46.3%, #7D26A2 54.1%, #632DB5 63.2%, #4735CB 73.76%, #273DE4 85.97%, #0347FF 100%); padding: 0.5rem; margin: 0; border-radius: 0.25rem; color: #f2f2f2; font-weight: 600; margin-bottom: 2.5px`,
      "https://peterfritz.dev"
    );
  }, []);

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
