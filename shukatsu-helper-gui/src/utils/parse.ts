import {getRandomInt} from './math'

type Context = string[];

//note: rootはpublicフォルダ基準
export const readFileAsync = async (filepath: string): Promise<Context> => {
  try {
    return (await (await fetch(filepath)).text()).split('\n');
  } catch {
    throw new Error(`Error: failed reading a file at a path ${filepath}`);
  }
};

type Reader = (filepath: string) => Promise<Context>;
export const getFileContextAsync = (): Reader => {
  const map = new Map<string, Promise<Context>>();

  return async (filepath: string): Promise<Context> => {
    if (!map.has(filepath)) {
      map.set(filepath, readFileAsync(filepath));
    }
    return map.get(filepath)!;
  };
};

export const pickRandom = <T>(set: T[]):T => {
  return set[getRandomInt(0, set.length-1)];
}