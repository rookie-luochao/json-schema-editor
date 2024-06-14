export function cleanedMapStr(mapString?: string) {
  if (!mapString) {
    return "";
  }

  return mapString.replace(/\s+/g, "");
}

export function getRandomInt(max: number) {
  return Math.floor(Math.random() * max);
}

export function formatJson(jsonString: string, tabSize: number) {
  try {
    const parsed = JSON.parse(jsonString) as object;

    return JSON.stringify(parsed, null, tabSize);
  } catch (e) {
    return jsonString;
  }
}
