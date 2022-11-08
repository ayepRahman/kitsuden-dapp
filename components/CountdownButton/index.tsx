// var countDownDate = new Date("Jan 5, 2024 15:37:25").getTime();

import Button from "@components/Button";
import router from "next/router";
import { useEffect, useState } from "react";

// // Update the count down every 1 second
// var x = setInterval(function() {

//   // Get today's date and time
//   var now = new Date().getTime();

//   // Find the distance between now and the count down date
//   var distance = countDownDate - now;

//   // Time calculations for days, hours, minutes and seconds
//   var days = Math.floor(distance / (1000 * 60 * 60 * 24));
//   var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
//   var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
//   var seconds = Math.floor((distance % (1000 * 60)) / 1000);

//   // Display the result in the element with id="demo"
//   document.getElementById("demo").innerHTML = days + "d " + hours + "h "
//   + minutes + "m " + seconds + "s ";

//   // If the count down is finished, write some text
//   if (distance < 0) {
//     clearInterval(x);
//     document.getElementById("demo").innerHTML = "EXPIRED";
//   }
// }, 1000);

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

const getReturnValues = (countDown: number) => {
  // calculate time left
  const days = Math.floor(countDown / (1000 * 60 * 60 * 24));
  const hours = Math.floor(
    (countDown % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
  );
  const minutes = Math.floor((countDown % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((countDown % (1000 * 60)) / 1000);

  return [days, hours, minutes, seconds];
};

const CountdownButtton = () => {
  // var countDownDate = new Date(1669478400000).getTime();
  const [days, hours, minutes, seconds, isComplete] =
    useCountdown(1669478400000);

  return (
    <Button
      onClick={() => isComplete && router.push("/mint-foxfone")}
      size="lg"
      fontSize={32}
      m="0 auto"
    >
      {!isComplete ? (
        <>
          {days} : {hours} : {minutes} : {seconds}
        </>
      ) : (
        <>Enter Now</>
      )}
    </Button>
  );
};

export default CountdownButtton;
