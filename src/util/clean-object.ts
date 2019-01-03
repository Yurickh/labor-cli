export default function cleanObject(object: object) {
  return Object.entries(object)
    .filter(([, value]) => value !== undefined)
    .reduce(
      (acc, [key, value]) => ({
        ...acc,
        [key]: value,
      }),
      {},
    )
}
