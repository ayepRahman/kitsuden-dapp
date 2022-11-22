// var countDownDate = new Date("Jan 5, 2024 15:37:25").getTime();

import Button from "@components/Button";
import useIsMounted from "@hooks/useIsMounted";
import router from "next/router";
import { useEffect, useState } from "react";

const useCountdown = (targetDate: string | Date | number) => {
  const countDownDate = new Date(targetDate).getTime();

  const [countDown, setCountDown] = useState(
    countDownDate - new Date().getTime()
  );

  const isComplete = countDown < 0;

  useEffect(() => {
    const interval = setInterval(() => {
      setCountDown(countDownDate - new Date().getTime());
    }, 1000);

    return () => clearInterval(interval);
  }, [countDownDate]);

  return [...getReturnValues(countDown), isComplete];
};

const prefixZero = (value: number) => (value < 10 ? `0${value}` : value);

const getReturnValues = (countDown: number) => {
  // calculate time left
  const days = Math.floor(countDown / (1000 * 60 * 60 * 24));
  const hours = Math.floor(
    (countDown % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
  );
  const minutes = Math.floor((countDown % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((countDown % (1000 * 60)) / 1000);

  return [days, hours, minutes, seconds].map((v) => prefixZero(v));
};

const CountdownButtton = () => {
  const isMounted = useIsMounted();
  const [showChecker, setShowChecker] = useState<boolean>(false);
  const [days, hours, minutes, seconds, isComplete] =
    useCountdown(1669478400000);

  if (!isMounted) return null;

  const handleRedirect = () => {
    if (isComplete) {
      router.push("/mint-foxfone");
    } else {
      router.push("/wallet-checker");
    }
  };

  return (
    <Button
      onMouseOver={() => {
        setShowChecker(true);
      }}
      onMouseLeave={() => {
        setShowChecker(false);
      }}
      onClick={() => handleRedirect()}
      size="lg"
      fontSize={32}
      m="0 auto"
    >
      {!isComplete ? (
        <>
          {!showChecker ? (
            <>
              {days} : {hours} : {minutes} : {seconds}
            </>
          ) : (
            <>CHECK WALLET</>
          )}
        </>
      ) : (
        <>Enter Now</>
      )}
    </Button>
  );
};

export default CountdownButtton;
