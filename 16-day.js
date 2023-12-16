import { fetchInput, splitByLines } from './utils/index.js'

const main = async () => {
    const data = await fetchInput({ day: 16, year: 2023 })

    const grid = splitByLines({ input: data }).map(row => row.split(''))
    const directionToCoord = {
        up: [0, -1],
        right: [1, 0],
        down: [0, 1],
        left: [-1, 0]
    }

    const beamSplits = {}
    const energyGrid = JSON.parse(JSON.stringify(grid))

    const beam = (x, y, direction) => {
        const [dx, dy] = directionToCoord[direction]
        const nextX = x + dx
        const nextY = y + dy
        const tile = grid[nextY]?.[nextX]

        if (!tile) {
            return
        }

        energyGrid[nextY][nextX] = '#'

        switch (tile) {
            case '.':
                beam(nextX, nextY, direction)

                break
            case '-': {
                if (direction === 'up' || direction === 'down') {
                    if (!beamSplits[`${nextX},${nextY},left`]) {
                        beamSplits[`${nextX},${nextY},left`] = true
                        beam(nextX, nextY, 'left')
                    }

                    if (!beamSplits[`${nextX},${nextY},right`]) {
                        beamSplits[`${nextX},${nextY},right`] = true
                        beam(nextX, nextY, 'right')
                    }
                } else {
                    beam(nextX, nextY, direction)
                }

                break
            }
            case '|': {
                if (direction === 'left' || direction === 'right') {
                    if (!beamSplits[`${nextX},${nextY},up`]) {
                        beamSplits[`${nextX},${nextY},up`] = true
                        beam(nextX, nextY, 'up')
                    }

                    if (!beamSplits[`${nextX},${nextY},down`]) {
                        beamSplits[`${nextX},${nextY},down`] = true
                        beam(nextX, nextY, 'down')
                    }
                } else {
                    beam(nextX, nextY, direction)
                }

                break
            }
            case '\\': {
                if (direction === 'left') {
                    beam(nextX, nextY, 'up')
                } else if (direction === 'up') {
                    beam(nextX, nextY, 'left')
                } else if (direction === 'down') {
                    beam(nextX, nextY, 'right')
                } else if (direction === 'right') {
                    beam(nextX, nextY, 'down')
                }

                break
            }
            case '/': {
                if (direction === 'left') {
                    beam(nextX, nextY, 'down')
                } else if (direction === 'up') {
                    beam(nextX, nextY, 'right')
                } else if (direction === 'down') {
                    beam(nextX, nextY, 'left')
                } else if (direction === 'right') {
                    beam(nextX, nextY, 'up')
                }

                break
            }
        }
    }

    beam(-1, 0, 'right')

    console.log(energyGrid.reduce((acc, row) => acc + row.filter(item => item === '#').length, 0))
}

main()
