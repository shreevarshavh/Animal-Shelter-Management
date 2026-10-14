import { useEffect, useState } from "react";
import { getAnimals } from "../services/animalService.js";

export default function useAnimals() {
  const [animals, setAnimals] = useState(() => getAnimals());

  useEffect(() => {
    const refresh = () => setAnimals(getAnimals());
    window.addEventListener("pawtrack:animals-updated", refresh);
    window.addEventListener("storage", refresh);
    return () => {
      window.removeEventListener("pawtrack:animals-updated", refresh);
      window.removeEventListener("storage", refresh);
    };
  }, []);

  return animals;
}