import { ELocalStorage } from "@/models";

export const persistLocalStorage = <T>(key: string, value: T) => {
  localStorage.setItem(key, JSON.stringify(value));
};

export const clearLocalStorage = (key: string) => {
  localStorage.removeItem(key);
};

export const getLocalStorage = <T>(key: string): T => {
  return JSON.parse(localStorage.getItem(key) as string) as T;
};

export const updateIdOnLocalStorage = <T>(id: T, session: ELocalStorage) => {
  const current = getLocalStorage<T[]>(session) || [];

  if (!current.find((item) => item === id)) {
    persistLocalStorage(session, [...current, id]);
  } else {
    persistLocalStorage(
      session,
      current.filter((item) => item !== id)
    );
  }
};
