import { getNextAnimalId } from "../services/animalService.js";

export default function generateAnimalId(species) {
  return getNextAnimalId(species);
}