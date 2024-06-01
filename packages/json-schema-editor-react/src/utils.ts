export function cleanedMapStr(mapString?: string) {
  if (!mapString) {
    return "";
  }

  return mapString.replace(/\s+/g, "");
}

export function getRandomInt(max: number) {
  return Math.floor(Math.random() * max);
}
