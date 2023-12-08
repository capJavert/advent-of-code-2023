import { fetchInput, splitByLines } from './utils/index.js'

const main = async () => {
    const data = await fetchInput({ day: 8, year: 2023 })

    const [firstLine, ...lines] = splitByLines({ input: data })
    const instructions = firstLine.split('')
    const maps = lines.reduce((acc, line) => {
        const [from, left, right] = line.match(/[A-Z0-9]{3}/g)

        acc[from] = {
            L: left,
            R: right,
            isEnd: from.endsWith('Z')
        }

        return acc
    }, {})

    const startingNodes = Object.keys(maps).filter(key => key.endsWith('A'))
    const nodes = startingNodes.map(key => ({
        start: key,
        currentLocation: key
    }))

    let allSteps = []

    for (let node of nodes) {
        let currentLocation = node.currentLocation
        let index = 0
        let steps = 0

        while (true) {
            const instruction = instructions[index]
            currentLocation = maps[currentLocation][instruction]
            const { isEnd } = maps[currentLocation]

            steps += 1

            if (isEnd) {
                break
            }

            index = (index + 1) % instructions.length
        }

        allSteps.push(steps)
    }

    const gcd = (a, b) => {
        if (b === 0) {
            return a
        }

        return gcd(b, a % b)
    }

    const lcm = (a, b) => Math.abs(a * b) / gcd(a, b)

    console.log(allSteps.reduce(lcm))
}

main()
