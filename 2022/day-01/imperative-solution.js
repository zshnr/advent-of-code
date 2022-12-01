const fs = require('fs/promises')

const readInput = async () => {
  return await fs.readFile(`${__dirname}/input.txt`, { encoding: 'utf-8' })
}

readInput().then(b => {
  let cumulativeCaloriesForElf = 0
  let elves = []
  let calorie = ''

  for (let i = 0; i <= b.length - 1; i++) {
    if (i < b.length - 1) {
      // if its a string representation of a digit
      // accumulate in the string calorie
      if (b[i] !== '\n') {
        calorie += b[i]
        // if its the line break after a number and before another number begins
        // consider the number is accumulated
        // store it
        // reset the calorie variable
      } else if (b[i] === '\n' && b[i - 1] !== '\n' && b[i + 1] !== '\n') {
        cumulativeCaloriesForElf += parseInt(calorie, 10)

        calorie = ''
      } else if (b[i] === '\n' && b[i + 1] === '\n') {
        cumulativeCaloriesForElf += parseInt(calorie, 10)

        calorie = ''

        elves.push(cumulativeCaloriesForElf)

        cumulativeCaloriesForElf = 0
      }
    } else {
      if (b[i] !== '\n') {
        calorie += b[i]
        // console.log('calorie', calorie)

        cumulativeCaloriesForElf += parseInt(calorie, 10)

        calorie = ''

        elves.push(cumulativeCaloriesForElf)

        cumulativeCaloriesForElf = 0
      } else {
        cumulativeCaloriesForElf += parseInt(calorie, 10)

        calorie = ''

        elves.push(cumulativeCaloriesForElf)

        cumulativeCaloriesForElf = 0
      }
    }
  }

  elves.sort((n1, n2) => n2 - n1)

  console.log('elf with most calories: ', elves[0])

  console.log('Cumulative calories of top three elves: ', elves[0] + elves[1] + elves[2])

  return elves
})
