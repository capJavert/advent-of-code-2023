import { fetchInput, splitByLines } from './utils/index.js'

const main = async () => {
    const data = await fetchInput({ day: 18, year: 2023 })

    const plan = splitByLines({ input: data }).map(row => {
        const parts = row.split(' ')
        const direction = parts[0]
        const meters = +parts[1]
        const color = parts[2].replace(/\(|\)/g, '')

        return {
            direction,
            meters,
            color
        }
    })

    const hole = {}
    let x = 0
    let y = 0
    hole[`${x},${y}`] = true
    const directionToCoord = {
        R: [1, 0],
        L: [-1, 0],
        U: [0, -1],
        D: [0, 1]
    }

    for (let i = 0; i < plan.length; i++) {
        const { direction, meters } = plan[i]

        const [dx, dy] = directionToCoord[direction]

        for (let j = 0; j < meters; j++) {
            hole[`${x},${y}`] = true

            x += dx
            y += dy
        }

        hole[`${x},${y}`] = true
    }

    const floodFill = (matrix, x, y, newColor) => {
        const oldColor = matrix[`${x},${y}`]
        fill(matrix, x, y, oldColor, newColor)
        return matrix
    }

    const minX = Math.min(...Object.keys(hole).map(key => +key.split(',')[0]))
    const maxX = Math.max(...Object.keys(hole).map(key => +key.split(',')[0]))
    const minY = Math.min(...Object.keys(hole).map(key => +key.split(',')[1]))
    const maxY = Math.max(...Object.keys(hole).map(key => +key.split(',')[1]))

    const fill = (matrix, x, y, oldColor, newColor) => {
        if (x < minX || x > maxX || y < minY || y > maxY || matrix[`${x},${y}`] !== oldColor) {
            return
        }

        matrix[`${x},${y}`] = newColor

        fill(matrix, x + 1, y, oldColor, newColor)
        fill(matrix, x - 1, y, oldColor, newColor)
        fill(matrix, x, y + 1, oldColor, newColor)
        fill(matrix, x, y - 1, oldColor, newColor)
    }

    floodFill(hole, 1, 1, true)

    // eslint-disable-next-line no-unused-vars
    const print = () => {
        for (let y = minY; y <= maxY; y++) {
            let row = ''

            for (let x = minX; x <= maxX; x++) {
                if (x === 1 && y === 1) {
                    row += 'S'
                    continue
                }

                row += hole[`${x},${y}`] ? '#' : '.'
            }

            console.log(row)
        }
    }

    // print()

    console.log(Object.keys(hole).length)
}

// --stack-size=5000 needed due to the recursive nature of the floodFill function
main()
