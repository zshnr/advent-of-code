const fs = require('fs/promises')

const readInput = async () => {
  return await fs.readFile(`${__dirname}/input.txt`, { encoding: 'utf-8' })
}

async function solution() {
  const input = (await readInput()).split('\n')
  console.log(input)
  const stacks = parseInputToArray(input)
  const instructions = parseInputToInstructions(input)
  const transposedStacks = transposeArray(stacks)
  const rearrangedStacks = carryOutInstructions(instructions, transposedStacks)
  console.log(rearrangedStacks)
  const firstFromEachStack = getFirstFromEachStack(rearrangedStacks)

  const rearrangedStacks9001 = carryOutInstructions9001(instructions, transposedStacks)
  const firstFromEachStack9001 = getFirstFromEachStack(rearrangedStacks)

  console.log('For the first part of the puzzle, the answer is', firstFromEachStack)
  console.log('For the second part of the puzzle, the answer is', firstFromEachStack9001)
}

function parseInputToArray(input) {
  let stacks = []

  for (let i = 0; i < 8; i++) {
    let stack = []
    // for the length of the string
    const stringLength = input[i].length

    for (let j = 1; j < stringLength; j += 4) {
      stack.push(input[i][j])
    }

    stacks.push(stack)
  }

  return stacks
}

function parseInputToInstructions(input) {
  const instructions = []
  for (let i = 10; i < input.length; i++) {
    instructions.push(parseInstruction(input[i]))
  }
  return instructions
}

function parseInstruction(instruction) {
  return instruction.split(' ').map(s => parseInt(s, 10)).filter(n => !isNaN(n))
}

function transposeArray(array) {
  const masterArray = []
  for (let j = 0; j < 9; j++) {
    const temp = []
    for (let i = 0; i < array.length; i++) {
      temp.push(array[i][j] ?? ' ')
    }
    masterArray.push(temp)
  }
  return masterArray
}

function carryOutInstructions(instructions, stacks) {
  for (let i = 0; i < instructions.length; i++) {
    const instruction = instructions[i]
    const stacksFromIndex = instruction[1] - 1
    const stackFrom = stacks[stacksFromIndex]
    const stacksToIndex = instruction[2] - 1
    const stackTo = stacks[stacksToIndex]
    const qtyToMove = instruction[0]

    //console log all the above variables


    for (let j = 1; j <= qtyToMove; j++) {
      const letterToMoveIndex = stackFrom.findIndex(s => s !== ' ')
      const letterToMove = stackFrom[letterToMoveIndex]

      const emptySpaceIndex = stackTo.findLastIndex(s => s === ' ')

      if (emptySpaceIndex === -1) {
        stackTo.unshift(letterToMove)
      } else {
        stackTo[emptySpaceIndex] = letterToMove
      }

      stackFrom[letterToMoveIndex] = ' '
    }
  }

  return stacks
}

function carryOutInstructions9001(instructions, stacks) {
  for (let i = 0; i < instructions.length; i++) {
    const instruction = instructions[i]
    const stacksFromIndex = instruction[1] - 1
    const stackFrom = stacks[stacksFromIndex]
    const stacksToIndex = instruction[2] - 1
    const stackTo = stacks[stacksToIndex]
    const qtyToMove = instruction[0]

    if (qtyToMove === 1) {
      const letterToMoveIndex = stackFrom.findIndex(s => s !== ' ')
      const letterToMove = stackFrom[letterToMoveIndex]

      const emptySpaceIndex = stackTo.findLastIndex(s => s === ' ')

      if (emptySpaceIndex === -1) {
        stackTo.unshift(letterToMove)
      } else {
        stackTo[emptySpaceIndex] = letterToMove
      }

      stackFrom[letterToMoveIndex] = ' '
    } else if (qtyToMove > 1) {
      for (let j = 1; j <= qtyToMove; j++) {
        const letterToMoveIndex = stackFrom.findIndex(s => s !== ' ')
        const lettersToMove = stackFrom.slice(letterToMoveIndex, letterToMoveIndex + qtyToMove)

        const emptySpaceIndex = stackTo.findLastIndex(s => s === ' ')

        if (emptySpaceIndex === -1) {
          stackTo.unshift(...lettersToMove)
        } else {
          stackTo.splice(emptySpaceIndex, qtyToMove, ...lettersToMove)
        }

        stackFrom.splice(letterToMoveIndex, qtyToMove, ...Array(qtyToMove).fill(' '))
      }
    }
  }

  return stacks
}

function getFirstFromEachStack(stacks) {
  return stacks.map(stack => stack.find(s => s !== ' ')).join('')
}

solution().then()
