import { fetchInput, splitByLines } from './utils/index.js'

const main = async () => {
    const data = await fetchInput({ day: 11, year: 2023 })

    let recordedUniverse = splitByLines({ input: data }).map(line => line.split(''))
    const universe = splitByLines({ input: data }).map(line => line.split(''))

    // eslint-disable-next-line no-unused-vars
    const printUniverse = items => {
        console.log(items.map(row => row.join('')).join('\n'))
    }

    let addedRows = 0

    for (let y = 0; y < recordedUniverse.length; y += 1) {
        const row = recordedUniverse[y]

        if (row.includes('#')) {
            continue
        }

        universe.splice(y + addedRows, 0, [...row])
        addedRows += 1
    }

    recordedUniverse = JSON.parse(JSON.stringify(universe))
    let addedColumns = 0

    for (let x = 0; x < recordedUniverse[0].length; x += 1) {
        const column = recordedUniverse.map(row => row[x])

        if (column.includes('#')) {
            continue
        }

        universe.forEach((row, index) => {
            row.splice(x + addedColumns, 0, recordedUniverse[index][x])
        })
        addedColumns += 1
    }

    const manhattanDistance = (point1, point2) => Math.abs(point1.x - point2.x) + Math.abs(point1.y - point2.y)

    const galaxies = []

    for (let y = 0; y < universe.length; y += 1) {
        const row = universe[y]

        for (let x = 0; x < row.length; x += 1) {
            if (row[x] === '#') {
                universe[y][x] = galaxies.length + 1
                const galaxy = {
                    x,
                    y
                }
                galaxies.push(galaxy)
            }
        }
    }

    let distancesMap = {}

    for (let galaxyA of galaxies) {
        for (let galaxyB of galaxies) {
            if (galaxyA === galaxyB) {
                continue
            }

            const distance = manhattanDistance(galaxyA, galaxyB)

            distancesMap[
                [universe[galaxyA.y][galaxyA.x], universe[galaxyB.y][galaxyB.x]].sort((a, b) => b - a).toString()
            ] = distance
        }
    }

    console.log(Object.values(distancesMap).reduce((acc, value) => acc + value, 0))
}

main()
