import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";

function App() {
  const [login, setLogin] = useState(false);
  const [timer, setTimer] = useState(0);
  const [intervalId, setIntervalId] = useState(null);

  useEffect(() => {
    return () => {
      if (intervalId) clearInterval(intervalId);
    };
  }, [intervalId]);

  const handleLogin = () => {
    setLogin(true);
    setTimer(5); //your timer value to delete the session

    document.getElementById("loginb").style.visibility = "hidden";

    if (intervalId) {
      clearInterval(intervalId);
    }

    const id = setInterval(() => {
      setTimer(prevTimer => {
        if (prevTimer < 1) {
          clearInterval(id); // Clear the interval
          setLogin(false); // Update login status
          document.getElementById("loginb").style.visibility = "visible";
          toast.error("Session Expired");
        }
        return prevTimer - 1;
      });
    }, 1000);

    setIntervalId(id);
  };

  return (
    <>
      <h1 id="loginlabel">
        {login ? "Logged in" : "Not logged in"}
      </h1>
      <button onClick={handleLogin} id="loginb">
        Login
      </button>
      <p>{login ? `Time remaining: ${timer}s` : ''}</p>
    </>
  );
}

export default App;