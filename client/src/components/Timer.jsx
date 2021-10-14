import { useState, useEffect } from "react";

const Timer = ({ timeTillTimeOut, startTimer, stopTimer }) => {
  const [time, setTime] = useState(timeTillTimeOut);

  useEffect(() => {
    if (startTimer === true && time > 0) {
      setTimeout(() => setTime(time - 1), 1000);
    } else if ( time <= 0 ) {
        stopTimer()
    }
  }, [startTimer,time]);

  return <div style={{marginLeft: '5px'}}><p>{time}</p></div>;
};

export default Timer;
