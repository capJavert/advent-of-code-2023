import { fetchInput, splitByLines } from './utils/index.js'

const main = async () => {
    const data = await fetchInput({ day: 21, year: 2023 })

    const grid = splitByLines({ input: data }).map(item => item.split(''))

    const findField = start => {
        for (let i = 0; i < grid.length; i++) {
            for (let j = 0; j < grid[0].length; j++) {
                if (grid[i][j] === start) {
                    return [i, j]
                }
            }
        }
    }

    const start = findField('S')
    const targetSteps = 64
    let plots = [start]

    for (let step = 0; step < targetSteps; step++) {
        const visited = {}
        const queue = plots
        plots = []

        for (let [i, j] of queue) {
            const fields = [
                [i - 1, j],
                [i + 1, j],
                [i, j - 1],
                [i, j + 1]
            ]

            for (let [x, y] of fields) {
                if (grid[x]?.[y] !== '#' && !visited[`${x},${y}`]) {
                    visited[`${x},${y}`] = true
                    plots.push([x, y])
                }
            }
        }
    }

    console.log(plots.length)
}

main()
