import React, { useState, useEffect } from 'react';

const SecondCounter = (props) => {
  const [seconds, setSeconds] = useState(props.seconds);
  const [isPaused, setIsPaused] = useState(false);
  const [previousValue, setPreviousValue] = useState(0);

  const handlePause = () => {
    setIsPaused(true);
  };

  const handleResume = () => {
    setIsPaused(false);
    setSeconds(previousValue + 2 );
  };

  const handleReset = () => {
    setSeconds(0);
    setIsPaused(false);
  };

  useEffect(() => {
    const timer = setInterval(() => {
      if (!isPaused) {
        setSeconds((prevSeconds) => {
          setPreviousValue(prevSeconds);
          return prevSeconds + 1;
        });
      }
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, [isPaused]);

  let unit = seconds % 10;
  let ten = Math.trunc((seconds / 10) % 10);
  let hundred = Math.trunc((seconds / 100) % 10);
  let thousand = Math.trunc((seconds / 1000) % 10);
  let tenThousand = Math.trunc((seconds / 10000) % 10);
  let hunThousand = Math.trunc(seconds / 100000);

  return (
    <div className="app d-flex justify-content-center flex-wrap">
      <div className="row d-flex justify-content-center">
        <div className="icon box text-center"><i className="far fa-clock"></i></div>
        <div className="counter box">{hunThousand}</div>
        <div className="counter box">{tenThousand}</div>
        <div className="counter box">{thousand}</div>
        <div className="counter box">{hundred}</div>
        <div className="counter box">{ten}</div>
        <div className="counter box">{unit}</div>
      </div>
      <div className="col-6 justify-content-end btn-group" role="group" aria-label="Default button group">
        <button type="button" className="btn btn-outline-dark p-2" onClick={isPaused ? handleResume : handlePause}>
          {isPaused ? 'Resume' : 'Pause'}
        </button>
        <button type="button" className="btn btn-outline-dark p-2" onClick={handleReset}>
          Reset
        </button>
      </div>
    </div>
  );
};

export default SecondCounter;


