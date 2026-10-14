import { demoAnimals } from "../data/demoAnimals.js";

const STORAGE_KEY = "pawtrack_animals_v1";
const SEEDED_KEY = "pawtrack_demo_seeded_v1";

function readStored() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export function getAnimals() {
  if (typeof window === "undefined") return demoAnimals;
  let records = readStored();

  if (!records && localStorage.getItem(SEEDED_KEY) !== "true") {
    records = demoAnimals;
    saveAnimals(records);
    localStorage.setItem(SEEDED_KEY, "true");
  }

  return Array.isArray(records) ? records : [];
}

export function saveAnimals(animals) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(animals));
  window.dispatchEvent(new Event("pawtrack:animals-updated"));
}

export function registerAnimal(animal) {
  const animals = getAnimals();
  if (animals.some((item) => item.id === animal.id)) {
    throw new Error("Animal ID already exists. Please generate a new ID.");
  }
  saveAnimals([animal, ...animals]);
  return animal;
}

export function updateAnimal(id, updates) {
  const animals = getAnimals().map((animal) =>
    animal.id === id ? { ...animal, ...updates } : animal
  );
  saveAnimals(animals);
  return animals.find((animal) => animal.id === id);
}

export function getNextAnimalId(species = "Dog") {
  const prefix = species.toLowerCase() === "cat" ? "CAT" : species.toLowerCase() === "other" ? "OTH" : "DOG";
  const animals = getAnimals();
  const existing = animals
    .filter((animal) => animal.id?.startsWith(`${prefix}-`))
    .map((animal) => Number(animal.id.split("-")[1]))
    .filter(Number.isFinite);
  const next = Math.max(0, ...existing) + 1;
  return `${prefix}-${String(next).padStart(3, "0")}`;
}