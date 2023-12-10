import { fetchInput, splitByLines } from './utils/index.js'

const main = async () => {
    const data = await fetchInput({ day: 10, year: 2023 })

    const matrix = splitByLines({ input: data }).map(line => line.split(''))

    const directionMap = {
        '|': ['up', 'down'],
        '-': ['left', 'right'],
        L: ['up', 'right'],
        J: ['up', 'left'],
        7: ['down', 'left'],
        F: ['down', 'right']
    }

    const directionToCoordMap = {
        up: { x: 0, y: -1 },
        down: { x: 0, y: 1 },
        left: { x: -1, y: 0 },
        right: { x: 1, y: 0 }
    }

    const oppositeDirectionMap = {
        up: 'down',
        down: 'up',
        left: 'right',
        right: 'left'
    }

    let start = undefined

    let matrixMap = {}

    for (let y = 0; y < matrix.length; y += 1) {
        const row = matrix[y]

        for (let x = 0; x < row.length; x += 1) {
            if (row[x] === 'S') {
                start = { x, y }
            }

            matrixMap[`${x},${y}`] = row[x]
        }
    }

    // by looking at input figure out what S should be
    let startPipe = 'L'
    let directions = directionMap[startPipe]
    let position = { ...start }
    let stepsDistanceMap = {}

    for (let direction of directions) {
        let steps = 0

        while (true) {
            const move = directionToCoordMap[direction]
            position = {
                x: position.x + move.x,
                y: position.y + move.y
            }

            if (position.x === start.x && position.y === start.y) {
                break
            }

            steps += 1

            stepsDistanceMap[`${position.x},${position.y}`] = Math.min(
                stepsDistanceMap[`${position.x},${position.y}`] || Infinity,
                steps
            )

            direction = directionMap[matrixMap[`${position.x},${position.y}`]].filter(
                item => item !== oppositeDirectionMap[direction]
            )[0]
        }
    }

    console.log(Math.max(...Object.values(stepsDistanceMap)))
}

main()
