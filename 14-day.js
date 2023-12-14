import { fetchInput, splitByLines } from './utils/index.js'

const main = async () => {
    const data = await fetchInput({ day: 14, year: 2023 })
    const matrix = splitByLines({ input: data }).map(row => row.split(''))

    let loadSize = 0

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

            loadSize += matrix.length - nextIndex
        }
    }

    console.log(loadSize)
}

main()
