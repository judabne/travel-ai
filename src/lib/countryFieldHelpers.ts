export function normalizeOptionalCountryField(
  value: string | undefined
): string | undefined {
  if (!value) {
    return undefined;
  }

  const normalized = value.trim().toLowerCase();
  return normalized || undefined;
}

export function optionalCountryFieldsEqual(
  left: string | undefined,
  right: string | undefined
): boolean {
  return (
    normalizeOptionalCountryField(left) ===
    normalizeOptionalCountryField(right)
  );
}
