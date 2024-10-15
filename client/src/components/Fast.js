import React, { useState, useEffect } from 'react';

const FastingTimer = () => {
  const [startTime, setStartTime] = useState(Date.now());
  const [elapsedTime, setElapsedTime] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setElapsedTime(Date.now() - startTime);
    }, 1000);

    return () => clearInterval(intervalId);
  }, [startTime]);

  const formatTime = (milliseconds) => {
    const totalSeconds = Math.floor(milliseconds / 1000);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  const handleStart = () => {
    setStartTime(Date.now());
  };

  const handleStop = () => {
    setStartTime(null); // Stop the timer
  };

  return (
    <div>
      <h1>Fasting Timer</h1>
      <p>Elapsed Time: {formatTime(elapsedTime)}</p>
      {startTime ? (
        <button onClick={handleStop}>Stop</button>
      ) : (
        <button onClick={handleStart}>Start</button>
      )}
    </div>
  );
};

export default FastingTimer;