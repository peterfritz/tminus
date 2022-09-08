import confetti from "canvas-confetti";
import { Button, Center, Group, Stack, Text } from "@mantine/core";
import React, { useEffect, useState } from "react";
import { animationInterval } from "../lib/time";
import { useIdle } from "@mantine/hooks";
import { openConfirmModal } from "@mantine/modals";

interface Props {
  time: string;
  close?: () => void;
}

const Countdown: React.FC<Props> = ({ time, close }) => {
  const idle = useIdle(1000);
  const [remainingTime, setRemainingTime] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    done: false,
  });

  const soundEffect = new Audio("/game.wav");

  const handleEnd = () => {
    soundEffect.play();
    confetti({
      particleCount: 150,
      startVelocity: 60,
      origin: {
        y: 1,
      },
      zIndex: 1000,
      spread: 120,
    });
  };

  const handleClose = () => {
    if (remainingTime.done) {
      return close && close();
    }

    openConfirmModal({
      title: "Cancelar contagem",
      zIndex: 1000,
      centered: true,
      children: (
        <Text size="sm">Você deseja realmente cancelar a contagem?</Text>
      ),
      labels: {
        cancel: "Não",
        confirm: "Sim",
      },
      onConfirm: () => {
        close && close();
      },
    });
  };

  useEffect(() => {
    const countdownController = new AbortController();
    let interval: any;

    const updateCountdown = () => {
      const now = Date.now();
      const deadline = new Date(time).getTime();
      const remaining = deadline - now;
      const days = Math.floor(remaining / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
        (remaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const minutes = Math.floor((remaining % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((remaining % (1000 * 60)) / 1000);

      setRemainingTime({
        days: days >= 0 ? days : 0,
        hours: hours >= 0 ? hours : 0,
        minutes: minutes >= 0 ? minutes : 0,
        seconds: seconds >= 0 ? seconds : 0,
        done: days <= 0 && hours <= 0 && minutes <= 0 && seconds <= 0,
      });

      if (days <= 0 && hours <= 0 && minutes <= 0 && seconds <= 0) {
        handleEnd();

        countdownController.abort();
        clearInterval(interval);

        return;
      }
    };

    animationInterval(1000, countdownController.signal, () => {
      updateCountdown();
    });

    interval = setInterval(() => {
      updateCountdown();
    }, 1000);

    updateCountdown();

    return () => {
      clearInterval(interval);
      countdownController.abort();
    };
  }, [time]);

  return (
    <Center
      style={{
        minHeight: "100%",
        minWidth: "100%",
      }}
    >
      <Stack spacing={0} align="center">
        <Button
          variant="default"
          aria-hidden
          style={{
            visibility: "hidden",
            opacity: 0,
            userSelect: "none",
            pointerEvents: "none",
          }}
        />
        <Group align="center" spacing="xs">
          <Text
            size={80}
            sx={(theme) => ({
              fontFamily: theme.fontFamilyMonospace,
            })}
            variant="text"
            gradient={{
              from: "violet",
              to: "red",
              deg: 90,
            }}
          >
            {`0${remainingTime.minutes}`.slice(-2)}
          </Text>
          <Text
            size={80}
            sx={(theme) => ({
              fontFamily: theme.fontFamilyMonospace,
              userSelect: "none",
            })}
            onClick={handleEnd}
          >
            :
          </Text>
          <Text
            size={80}
            sx={(theme) => ({
              fontFamily: theme.fontFamilyMonospace,
            })}
            variant="text"
            gradient={{
              from: "violet",
              to: "red",
              deg: 270,
            }}
          >
            {`0${remainingTime.seconds}`.slice(-2)}
          </Text>
        </Group>
        <Button
          variant="default"
          sx={() => ({
            transition: "opacity 0.5s",
            opacity: idle ? 0 : 1,
            "&:hover": {
              opacity: 1,
            },
          })}
          onClick={() => handleClose()}
        >
          {remainingTime.done ? "Fechar" : "Cancelar"}
        </Button>
      </Stack>
    </Center>
  );
};

export default Countdown;
