import { getGreeting } from "../../apiManager";
import { useEffect, useState } from "react";
import { AllDogs } from "./AllDogs.js";
import { AddDog } from "./AddDog.js";

export default function Home() {

  const [greeting, setGreeting] = useState({
    message: "You are not Connected to the API",
  });

  useEffect(() => {
    getGreeting()
      .then(setGreeting)
      .catch(() => {
        console.log("API not connected");
      });
  }, []);

  return (
    <>
      <p>{greeting.message}</p>
      <AllDogs />
      <AddDog />
    </>
  ) 
}
