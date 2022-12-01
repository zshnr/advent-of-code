import fs from 'fs/promises'

const map = <A, B>(mapFn: (arg: A) => B) => (arr: Array<A>) => arr.map(mapFn);
const pipe = <T>(...ops: Array<Function>) => ops.reduce((a, b) => (arg: T) => b(a(arg)));
const split = (pattern: string | RegExp) => (s: string) => s.split(pattern)
const flatMap = <A, B>(mapFn: (arg: A) => B) => (arr: Array<A>) => arr.flatMap(mapFn);
const sort = <A>(compareFn: (arg1: A, arg2: A) => number) => (arr: Array<A>) => [...arr.sort(compareFn)]
const pluckAt = <T>(index: number) => (arr: Array<T>) => arr.at(index)
const slice = <T>(from: number, to: number) => (arr: Array<T>) => arr.slice(from, to)

const readInput = async (): Promise<string> => {
  return await fs.readFile(`${__dirname}/input.txt`, { encoding: "utf-8" });
};

const formatStringsIntoCollections = (s: string) =>
  s.split("\n").flat().map(parseToNumber);

const parseToNumber = (s: string) => parseInt(s, 10);

const calculateTotalCaloriesForEachElf = (calories: Array<number>): number =>
  calories.reduce((acc, val) => acc + val, 0);

const sortDescending = (n1: number, n2: number) => n2 - n1;

export async function solution() {
  return pipe(
    split(/[^0-9]\n/),
    map(formatStringsIntoCollections),
    flatMap(calculateTotalCaloriesForEachElf),
    sort(sortDescending),
    pluckAt(0)
  )(await readInput());
}
solution().then(a => console.log(a))
