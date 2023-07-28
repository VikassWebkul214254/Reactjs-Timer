import { useState, useEffect } from 'react';
import './App.css';
import Timer from './Component/Timer';
let lap = [];
function useTime() {


  const [time, setTime] = useState(1);
  const [isRunning, setIsRunning] = useState(true);

  useEffect(() => {
    let id;

    if (isRunning) {
      id = setInterval(() => {
        setTime((prevTime) => prevTime + 1);
      }, 1000);
    }

    return () => clearInterval(id);
  }, [isRunning]);

  const resetTimer = () => {
    setTime(1);
    lap = [];
  };

  const stopTimer = () => {
    setIsRunning(false);
  };

  const startTimer = () => {
    setIsRunning(true);
  };

  const setLap = () => {
    if(! lap.includes(time))
    {
      lap.push(time);
    }
  };

  return { time, isRunning, resetTimer, stopTimer, startTimer, setLap };
}

function App() {
  const { time, isRunning, resetTimer, stopTimer, startTimer, setLap } = useTime();

  const handleResetClick = () => {
    resetTimer();
  };

  const handleStopClick = () => {
    stopTimer();
  };

  const handleStartClick = () => {
    startTimer();
  };


  const handleLapClick = () => {
    setLap();
  };
  

  return (
    <div className="App">
      <Timer value={time} />
      <button onClick={handleResetClick}>Reset</button>

      {isRunning ? (
        <button onClick={handleStopClick}>Stop</button>
      ) : (
        <button onClick={handleStartClick}>Start</button>
      )}

      <button onClick={handleLapClick}>Lap</button>
      
        <p>{lap}</p>
    </div>
  );
}

export default App;
