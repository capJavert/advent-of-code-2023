import { fetchInput, splitByLines } from './utils/index.js'

const main = async () => {
    const data = await fetchInput({ day: 8, year: 2023 })

    const [firstLine, ...lines] = splitByLines({ input: data })
    const instructions = firstLine.split('')
    const maps = lines.reduce((acc, line) => {
        const [from, left, right] = line.match(/[A-Z]{3}/g)

        acc[from] = {
            L: left,
            R: right
        }

        return acc
    }, {})

    const start = 'AAA'
    const end = 'ZZZ'
    let currentLocation = start
    let index = 0
    let steps = 0

    while (currentLocation !== end) {
        const instruction = instructions[index]
        currentLocation = maps[currentLocation][instruction]

        index = (index + 1) % instructions.length
        steps += 1
    }

    console.log(steps)
}

main()
