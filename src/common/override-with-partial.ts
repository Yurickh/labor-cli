export default function overrideWithPartial<T>(
  fallbacks: T,
  partial: Partial<T> | null,
): T {
  if (partial === null) return fallbacks

  return Object.entries(partial)
    .filter(([, value]) => value !== undefined)
    .reduce(
      (acc, [key, value]) => ({
        ...acc,
        [key]: value,
      }),
      fallbacks,
    )
}
