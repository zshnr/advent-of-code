const fs = require('fs/promises')

const readInput = async () => {
  return await fs.readFile(`${__dirname}/input.txt`, { encoding: 'utf-8' })
}

async function solution() {
  const input = await readInput()

  const startOfPacketCharacterCount = getCharacterCountBeforeStartOfPacketMarker(input)

  const startOfMessageCharacterCount = getCharacterCountBeforeStartOfMessageMarker()

  console.log('start of packet character count: ', startOfPacketCharacterCount)
  console.log('start of message character count: ', startOfMessageCharacterCount)
}

function getCharacterCountBeforeStartOfPacketMarker(dataBuffer) {
  // chunk input into groups of strings of length 4
  const groups = dataBuffer.match(/.{1,4}/g)
  let characterCount = 0

  for(let i = 0; i < groups.length; i++) {
    // check if group contains repeat characters
    const group = groups[i].split('')
    const uniqueCharacters = new Set(group)

    if (uniqueCharacters.size === 4) {
      characterCount += 1
      break
    }

    // keep a count of characters
    characterCount += groups[i].length
  }

  return characterCount
}

function getCharacterCountBeforeStartOfMessageMarker(dataBuffer = 'bvwbjplbgvbhsrlpgdmjqwftvncz') {
  // loop through each character of the string
  let lettersWeHaveSeen = []
  let uniqueCharacters = new Set()
  let index

  while (uniqueCharacters.size < 14) {
    for ( let i = 0; i < dataBuffer.length; i++) {
      if (lettersWeHaveSeen.includes(dataBuffer[i])) {
        uniqueCharacters.clear()
        lettersWeHaveSeen = []
      } else {
        lettersWeHaveSeen.push(dataBuffer[i])
        uniqueCharacters.add(dataBuffer[i])
      }
    }
  }

  console.log(uniqueCharacters.entries().next().value[0])

  return dataBuffer.indexOf(uniqueCharacters.entries().next().value[0])

  // keep a count of the characters we have looped through
  // keep track of every letter we have seen
  // on every iteration, check if the current character is in the set of seen characters
  // keep a count of start of message marker
  // if a character is in the set of seen characters, then reset start of message marker
  // return the character count was start of message marker === 14
}

solution().then()