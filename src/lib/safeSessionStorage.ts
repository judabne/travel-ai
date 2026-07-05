export function safeSessionStorageGet(key: string): string | null {
  if (typeof window === "undefined") {
    return null;
  }

  try {
    return sessionStorage.getItem(key);
  } catch {
    return null;
  }
}

export function safeSessionStorageSet(key: string, value: string): boolean {
  if (typeof window === "undefined") {
    return false;
  }

  try {
    sessionStorage.setItem(key, value);
    return true;
  } catch {
    return false;
  }
}
