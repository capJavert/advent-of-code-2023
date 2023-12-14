import { fetchInput, splitByLines } from './utils/index.js'

const main = async () => {
    const data = await fetchInput({ day: 14, year: 2023 })
    const matrix = splitByLines({ input: data }).map(row => row.split(''))

    // eslint-disable-next-line no-unused-vars
    const debugMatrix = direction => {
        console.log(direction)
        console.log()
        console.log(matrix.map(row => row.join('')).join('\n'))
        console.log()
    }

    const initState = matrix.map(row => row.join('')).join('\n')

    const stateCache = {
        [initState]: true
    }

    const calculateLoadSize = (log = true) => {
        let loadSize = 0

        for (let i = 0; i < matrix.length; i++) {
            for (let j = 0; j < matrix[i].length; j++) {
                if (matrix[i][j] !== 'O') {
                    continue
                }

                loadSize += matrix.length - i
            }
        }

        if (log) {
            console.log(loadSize)
        }

        return loadSize
    }

    const checkState = (index, direction) => {
        return // uncomment for debug

        const state = matrix.map(row => row.join('')).join('\n')

        if (!stateCache[state]) {
            stateCache[state] = true
        }

        if (direction === 'right') {
            const loadSize = calculateLoadSize(false)

            console.log(Object.keys(stateCache).length, 'matched state', index, direction, loadSize)
        }
    }

    // basically the cycles start to repeat after some time
    // so just 131 iterations was enough to find a first loop
    // no need to do 1000000000 cycles
    for (let c = 0; c < 160; c++) {
        // up
        for (let i = 0; i < matrix.length; i++) {
            const row = matrix[i]

            for (let j = 0; j < row.length; j++) {
                const item = row[j]

                if (item !== 'O') {
                    continue
                }

                let nextIndex = i

                for (let k = i - 1; k >= 0; k--) {
                    if (matrix[k][j] !== '.') {
                        break
                    }

                    nextIndex = k
                }

                if (nextIndex !== i) {
                    let swap = matrix[nextIndex][j]
                    matrix[nextIndex][j] = item
                    matrix[i][j] = swap
                }
            }
        }

        checkState(c, 'up')

        // left
        for (let i = 0; i < matrix[0].length; i++) {
            for (let j = 0; j < matrix.length; j++) {
                const item = matrix[j][i]

                if (item !== 'O') {
                    continue
                }

                let nextIndex = i

                for (let k = i - 1; k >= 0; k--) {
                    if (matrix[j][k] !== '.') {
                        break
                    }

                    nextIndex = k
                }

                if (nextIndex !== i) {
                    let swap = matrix[j][nextIndex]
                    matrix[j][nextIndex] = item
                    matrix[j][i] = swap
                }
            }
        }

        checkState(c, 'left')

        // down
        for (let i = matrix.length - 1; i >= 0; i--) {
            const row = matrix[i]

            for (let j = 0; j < row.length; j++) {
                const item = row[j]

                if (item !== 'O') {
                    continue
                }

                let nextIndex = i

                for (let k = i + 1; k < matrix.length; k++) {
                    if (matrix[k][j] !== '.') {
                        break
                    }

                    nextIndex = k
                }

                if (nextIndex !== i) {
                    let swap = matrix[nextIndex][j]
                    matrix[nextIndex][j] = item
                    matrix[i][j] = swap
                }
            }
        }

        checkState(c, 'down')

        // right
        for (let i = matrix[0].length; i >= 0; i--) {
            for (let j = 0; j < matrix.length; j++) {
                const item = matrix[j][i]

                if (item !== 'O') {
                    continue
                }

                let nextIndex = i

                for (let k = i + 1; k < matrix.length; k++) {
                    if (matrix[j][k] !== '.') {
                        break
                    }

                    nextIndex = k
                }

                if (nextIndex !== i) {
                    let swap = matrix[j][nextIndex]
                    matrix[j][nextIndex] = item
                    matrix[j][i] = swap
                }
            }
        }

        checkState(c, 'right')
    }

    calculateLoadSize()
}

main()
