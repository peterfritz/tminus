import type { NextPage } from "next";
import type { StringValue } from "ms";
import { useEffect, useState } from "react";
import { useForm } from "@mantine/form";
import ms from "ms";
import { Center } from "@mantine/core";
import Countdown from "../../components/Countdown";
import { useRouter } from "next/router";

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
  const router = useRouter();
  const { date } = router.query;

  return (
    <Center
      style={{
        height: "100%",
        width: "100%",
      }}
    >
      <Countdown time={date as string} close={() => router.push("/")} />
    </Center>
  );
};

export default Home;
