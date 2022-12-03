const fs = require('fs/promises')

const readInput = async () => {
  return await fs.readFile(`${__dirname}/input.txt`, { encoding: 'utf-8' })
}

const sum = (n1, n2) => n1 + n2

const priorities = [null, 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z']

async function solution() {
  const input = (await readInput()).split('\n')
  const solutionPartOne = input.map(compartmentContent => {
      const compartmentOne = compartmentContent.substring(0, compartmentContent.length / 2)
      const compartmentTwo = compartmentContent.substring(compartmentContent.length / 2)
      const commonLetter = Array.from(compartmentOne).find(letter => compartmentTwo.includes(letter))
      const letterPriority = priorities.indexOf(commonLetter)
      return letterPriority
    })
    .reduce(sum, 0)

  console.log('Sum of priorities for items in both compartments: ', solutionPartOne)

  let solutionPartTwo = []

  for (let i = 0; i < input.length; i += 3) {
    solutionPartTwo.push(input.slice(i, i + 3))
  }

  solutionPartTwo = solutionPartTwo.map(compartmentContent => {
    const compartmentOne = compartmentContent[0]
    const compartmentTwo = compartmentContent[1]
    const compartmentThree = compartmentContent[2]
    const commonLetter = Array.from(compartmentOne).find(letter => compartmentTwo.includes(letter) && compartmentThree.includes(letter))
    const letterPriority = priorities.indexOf(commonLetter)
    return letterPriority
  }).reduce(sum, 0)

  console.log('Sum of priorities for items that are common between three elves: ', solutionPartTwo)
}

solution().then()