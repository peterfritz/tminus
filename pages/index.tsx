import type { NextPage } from "next";
import type { StringValue } from "ms";
import { useEffect, useState } from "react";
import { FaInfo } from "react-icons/fa";
import { useForm } from "@mantine/form";
import ms from "ms";
import {
  Button,
  Center,
  Code,
  HoverCard,
  Modal,
  SegmentedControl,
  Stack,
  Text,
  TextInput,
  ThemeIcon,
} from "@mantine/core";
import Countdown from "../components/Countdown";
import { getHotkeyHandler } from "@mantine/hooks";
import Head from "next/head";

const presetTimers = [
  {
    label: "5 minutos",
    value: "5m",
  },
  {
    label: "7 minutos",
    value: "7m",
  },
  {
    label: "10 minutos",
    value: "10m",
  },
];

const Home: NextPage = () => {
  const [selectedTime, setSelectedTime] = useState(presetTimers[0].value);
  const [countdown, setCountdown] = useState("");
  const form = useForm({
    initialValues: {
      time: "",
    },
  });

  useEffect(() => {
    if (presetTimers.some(({ value }) => value === form.values.time)) {
      setSelectedTime(form.values.time);
    } else {
      setSelectedTime("other");
    }
  }, [form.values.time]);

  const initTimer = () => {
    try {
      const time = ms(form.values.time as StringValue);

      if (!time) {
        throw new Error();
      }

      setCountdown(new Date(Date.now() + time + ms("1s")).toISOString());
    } catch (_) {
      form.setFieldError("time", "Formato inválido");
    }
  };

  return (
    <Center
      style={{
        height: "100%",
        width: "100%",
      }}
    >
      <Head>
        <title>tminus</title>
      </Head>
      <Stack>
        <SegmentedControl
          value={selectedTime}
          onChange={(value) =>
            form.setValues({
              time: value === "other" ? "" : value,
            })
          }
          data={[
            ...presetTimers,
            {
              label: "Outro",
              value: "other",
            },
          ]}
        />
        <TextInput
          rightSection={
            <HoverCard width={280} shadow="md">
              <HoverCard.Target>
                <ThemeIcon variant="light" color="dark" size="sm">
                  <FaInfo size={10} />
                </ThemeIcon>
              </HoverCard.Target>
              <HoverCard.Dropdown>
                <Text size="sm" align="center">
                  Formatos aceitos: <Code>30s</Code>, <Code>1m</Code>,{" "}
                  <Code>2.5h</Code>
                </Text>
              </HoverCard.Dropdown>
            </HoverCard>
          }
          autoComplete="off"
          {...form.getInputProps("time")}
          onKeyDown={getHotkeyHandler([["enter", () => initTimer()]])}
        />
        <Button onClick={() => initTimer()}>Começar</Button>
        <Modal
          opened={!!countdown}
          onClose={() => {
            setCountdown("");
          }}
          fullScreen
          withCloseButton={false}
          styles={{
            body: {
              width: "100%",
              height: "100%",
            },
          }}
        >
          <Countdown time={countdown} close={() => setCountdown("")} />
        </Modal>
      </Stack>
    </Center>
  );
};

export default Home;
