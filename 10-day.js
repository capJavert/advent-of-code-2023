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
    // by looking at input figure out what S should be
    let startPipe = 'L'

    let matrixMap = {}

    for (let y = 0; y < matrix.length; y += 1) {
        const row = matrix[y]

        for (let x = 0; x < row.length; x += 1) {
            if (row[x] === 'S') {
                start = { x, y }
                matrixMap[`${x},${y}`] = row[x] = startPipe
            } else {
                matrixMap[`${x},${y}`] = row[x]
            }
        }
    }

    let directions = directionMap[startPipe]
    let position = { ...start }

    const loop = new Map()
    loop.set(`${position.x},${position.y}`, position)

    for (let direction of directions.slice(0, 1)) {
        while (true) {
            const move = directionToCoordMap[direction]
            position = {
                x: position.x + move.x,
                y: position.y + move.y
            }

            if (position.x === start.x && position.y === start.y) {
                break
            }

            loop.set(`${position.x},${position.y}`, position)

            direction = directionMap[matrixMap[`${position.x},${position.y}`]].filter(
                item => item !== oppositeDirectionMap[direction]
            )[0]
        }
    }
    let space = 0

    for (let y = 0; y < matrix.length; y += 1) {
        const row = matrix[y]

        for (let x = 0; x < row.length; x += 1) {
            if (loop.has(`${x},${y}`)) {
                continue
            }
            let intersections = 0

            for (let k = 0; k < x; k += 1) {
                if (loop.has(`${k},${y}`) && ['|', 'F', '7', 'S'].includes(matrixMap[`${k},${y}`])) {
                    intersections += 1
                }
            }

            // https://en.wikipedia.org/wiki/Jordan_curve_theorem
            // odd number of intersections means point is inside
            // the loop (geometry figure)
            if (intersections % 2 !== 0) {
                space += 1
            }
        }
    }

    console.log(space)
}

main()
