const fs = require('fs/promises')

const movesMap = {
  A: 'ROCK',
  B: 'PAPER',
  C: 'SCISSORS',
  X: 'ROCK',
  Y: 'PAPER',
  Z: 'SCISSORS',
}

const strategyMap = {
  X: 'LOSE',
  Y: 'DRAW',
  Z: 'WIN',
}

const pointsMap = {
  ROCK: 1,
  PAPER: 2,
  SCISSORS: 3,
}

const outcomeMap = {
  WON: 6,
  DRAW: 3,
  LOST: 0,
}

const winningMoves = {
  ROCK: 'SCISSORS',
  PAPER: 'ROCK',
  SCISSORS: 'PAPER',
}

const losingMoves = {
  ROCK: 'PAPER',
  PAPER: 'SCISSORS',
  SCISSORS: 'ROCK',
}

const sum = (n1, n2) => n1 + n2

const readInput = async () => {
  return await fs.readFile(`${__dirname}/input.txt`, { encoding: 'utf-8' })
}

async function solution () {
  const input = await readInput()
  const moves = input
    .split('\n')
    .map((line) => line.split(' '))
    .filter((line) => !line.includes(''))
  const resultPartOne = moves
    .map((round) => {
      const [opponent, me] = round
      const player1Move = movesMap[opponent]
      const player2Move = movesMap[me]
      const player2MovePoints = pointsMap[player2Move]

      if (player1Move === player2Move) {
        return outcomeMap.DRAW + player2MovePoints
      }

      if (winningMoves[player1Move] === player2Move) {
        return outcomeMap.LOST + player2MovePoints
      } else if (winningMoves[player2Move] === player1Move) {
        return outcomeMap.WON + player2MovePoints
      }
    }).reduce(sum, 0)
  const resultPartTwo = moves.map((round) => {
    const [whatOpponentPlays, theOutcomeIWant] = round
    const player1Move = movesMap[whatOpponentPlays]

    switch(strategyMap[theOutcomeIWant]) {
      case 'WIN':
        return pointsMap[losingMoves[player1Move]] + outcomeMap.WON
      case 'DRAW':
        return pointsMap[player1Move] + outcomeMap.DRAW
      case 'LOSE':
        return pointsMap[winningMoves[player1Move]] + outcomeMap.LOST
    }
  }).reduce(sum, 0)

  console.log('Total score for part one: ', resultPartOne)
  console.log('Total score for part two: ', resultPartTwo)
}

solution().then()
