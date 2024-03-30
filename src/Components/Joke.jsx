import axios from "axios";
import React, { useEffect, useState } from "react";

function Joke() {
  const [jokeSetup, setJokeSetup] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    fetchJoke();
  }, []);

  const fetchJoke = () => {
    axios
      .get(
        "https://v2.jokeapi.dev/joke/Programming?blacklistFlags=religious,racist,sexist"
      )
      .then((response) => {
        if (response.data.type === "single") {
          setJokeSetup(response.data.joke);
          console.log(response)

        } else {
          setJokeSetup(`${response.data.setup} ${response.data.delivery}`);
          console.log(response)
        }
      })
      .catch((err) => {
        setError("Error fetching joke.");
      });
  };

  const getNewJoke = () => {
    fetchJoke();
  };

  return (
    <div className="flex items-center justify-center h-[100vh] bg-slate-200">
      <div className="w-[600px] bg-white rounded-md p-10 flex flex-col gap-10 shadow-xl">
        <h1 className="text-2xl font-semibold ">
          Random Programming Joke Generator
        </h1>
        <div className="">
          {error ? (
            <p>{error}</p>
          ) : (
            <p className="text-xl">"{jokeSetup}"</p>
          )}
        </div>
        <button className="p-2 bg-blue-300 rounded-md" onClick={getNewJoke}>New Joke</button>
      </div>
    </div>
  );
}

export default Joke;
