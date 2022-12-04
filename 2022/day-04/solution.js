const fs = require('fs/promises')

const readInput = async () => {
  return await fs.readFile(`${__dirname}/input.txt`, { encoding: 'utf-8' })
}

async function solution() {
  const assignments = (await readInput()).split('\n')
    .map(range => range.split(','))
    .map(rangeTuple =>
      rangeTuple.flatMap(range =>
        range.split('-')
        )
      )
    .map(rangeTuple => rangeTuple.flatMap(range => parseInt(range, 10)))

  const solutionPartOne = assignments
    .filter(range => fullyContainsAnother(range))
    .length

  const solutionPartTwo = assignments
    .filter(range =>  fullyContainsAnother(range) || partiallyOverlaps(range))
    .length

  console.log('In how many assignment pairs does one range fully contain the other? Answer: ', solutionPartOne)
  console.log('In how many assignment pairs do the ranges overlap? Answer: ', solutionPartTwo)
}

function fullyContainsAnother(range) {
  return (range[0] >= range[2] && range[1] <= range[3]) || (range[2] >= range[0] && range[3] <= range[1])
}

function partiallyOverlaps(range) {
  return (range[0] === range[2]) || (range[1] === range[3]) || (range[0] <= range[2] && range[1] >= range[2]) || (range[0] >= range[2] && range[3] >= range[0])
}

solution().then()