import { fetchInput, splitByLines } from './utils/index.js'

const main = async () => {
    const data = await fetchInput({ day: 3, year: 2023 })

    const parseGrid = data => {
        const grid = []
        const rows = splitByLines({ input: data })

        for (let i = 0; i < rows.length; i++) {
            const row = []
            for (let j = 0; j < rows[i].length; j++) {
                if (isNaN(parseInt(rows[i][j]))) {
                    row.push(rows[i][j])
                } else {
                    let number = ''
                    while (!isNaN(parseInt(rows[i][j]))) {
                        number += rows[i][j]
                        j++
                    }
                    j-- // decrement j to counter the increment in the while loop

                    for (let k = 0; k < number.length; k++) {
                        row.push(parseInt(number))
                    }
                }
            }
            grid.push(row)
        }

        return grid
    }

    const grid = parseGrid(data)

    const getAdjacentRows = (grid, i, j) => {
        const adjacentRows = []

        // Top
        if (i > 0) {
            adjacentRows.push(grid[i - 1][j])
        }

        // Bottom
        if (i < grid.length - 1) {
            adjacentRows.push(grid[i + 1][j])
        }

        // Left
        if (j > 0) {
            adjacentRows.push(grid[i][j - 1])
        }

        // Right
        if (j < grid[i].length - 1) {
            adjacentRows.push(grid[i][j + 1])
        }

        // Top-left
        if (i > 0 && j > 0) {
            adjacentRows.push(grid[i - 1][j - 1])
        }

        // Top-right
        if (i > 0 && j < grid[i].length - 1) {
            adjacentRows.push(grid[i - 1][j + 1])
        }

        // Bottom-left
        if (i < grid.length - 1 && j > 0) {
            adjacentRows.push(grid[i + 1][j - 1])
        }

        // Bottom-right
        if (i < grid.length - 1 && j < grid[i].length - 1) {
            adjacentRows.push(grid[i + 1][j + 1])
        }

        return adjacentRows
    }

    let partNumberSum = 0

    for (let i = 0; i < grid.length; i++) {
        for (let j = 0; j < grid[i].length; j++) {
            const item = grid[i][j]

            if (item === '.' || typeof item === 'number') {
                continue
            }

            const adjacentRows = getAdjacentRows(grid, i, j)

            let partNumbers = new Set()

            for (let k = 0; k < adjacentRows.length; k++) {
                if (typeof adjacentRows[k] === 'number') {
                    partNumbers.add(adjacentRows[k])
                }
            }

            partNumbers.forEach(partNumber => {
                partNumberSum += partNumber
            })
        }
    }

    console.log(partNumberSum)
}

main()
