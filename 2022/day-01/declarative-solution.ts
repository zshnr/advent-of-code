import * as fs from 'fs/promises'

const map = <A, B>(mapFn: (arg: A) => B) => (arr: Array<A>) => arr.map(mapFn);
const pipe = <T>(...ops: Array<Function>) => ops.reduce((a, b) => (arg: T) => b(a(arg)));
const split = (pattern: string | RegExp) => (s: string) => s.split(pattern)
const flatMap = <A, B>(mapFn: (arg: A) => B) => (arr: Array<A>) => arr.flatMap(mapFn);
const sort = <A>(compareFn: (arg1: A, arg2: A) => number) => (arr: Array<A>) => [...arr.sort(compareFn)]
const slice = <T>(from: number, to?: number) => (arr: Array<T>) => to ? arr.slice(from, to) : arr.slice(from)
const reduce = <T>(reduceFn: (accumulator: T, current: T) => T, initialValue: T) => (arr: Array<T>) => arr.reduce(reduceFn, initialValue)

const readInput = async (): Promise<string> => {
  return await fs.readFile(`${__dirname}/input.txt`, { encoding: 'utf-8' });
};

const formatStringsIntoCollections = (s: string) =>
  s.split("\n").flat().map(parseToNumber);

const parseToNumber = (s: string) => parseInt(s, 10);

const calculateTotalCaloriesForEachElf = (calories: Array<number>): number =>
  calories.reduce((acc, val) => acc + val, 0);

const sortDescending = (n1: number, n2: number) => n2 - n1;

const sum = (n1: number, n2: number) => n1 + n2

async function solution() {
  const input = await readInput()
  const sortedArray = pipe(
    split(/[^0-9]\n/),
    map(formatStringsIntoCollections),
    flatMap(calculateTotalCaloriesForEachElf),
    sort(sortDescending))(input)

  const topMostCalories = pipe(slice(0, 1), reduce(sum, 0))(sortedArray)

  console.log('elf with most calories: ', topMostCalories)

  const topThreeMostCaloriesCumulated = pipe(slice(0, 3), reduce(sum, 0))(sortedArray)

  console.log('Cumulative calories of top three elves: ', topThreeMostCaloriesCumulated)
}
solution().then();
