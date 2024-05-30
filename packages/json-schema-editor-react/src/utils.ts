export function cleanedMapStr(mapString?: string) {
  if (!mapString) {
    return "";
  }

  return JSON.stringify(JSON.parse(mapString));
}

export function getRandomInt(max: number) {
  return Math.floor(Math.random() * max);
}
