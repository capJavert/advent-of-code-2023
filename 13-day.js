import { fetchInput, splitByLines } from './utils/index.js'

const main = async () => {
    const data = await fetchInput({ day: 13, year: 2023 })

    const patterns = data
        .split('\n\n')
        .filter(Boolean)
        .map(pattern => {
            const rows = splitByLines({ input: pattern })
            const columns = rows[0].split('').reduce((acc, item, index) => {
                let column = ''

                rows.forEach(row => {
                    column += row[index]
                })

                acc.push(column)

                return acc
            }, [])

            return {
                raw: pattern,
                rows,
                columns
            }
        })

    const findReflecion = items => {
        for (let i = 0; i < items.length; i++) {
            const item = items[i]
            const next = items[i + 1]

            if (!next) {
                break
            }

            if (item === next) {
                for (let j = 0; j < items.length; j++) {
                    if (!items[i - j] || !items[i + 1 + j]) {
                        return i + 1
                    }

                    if (items[i - j] !== items[i + 1 + j]) {
                        break
                    }
                }
            }
        }

        return 0
    }

    let rowsCount = 0
    let columnsCount = 0

    patterns.forEach(({ rows, columns, raw }) => {
        let reflection = findReflecion(rows)

        if (!reflection) {
            reflection = findReflecion(columns)
            columnsCount += reflection
        } else {
            rowsCount += reflection
        }
    })

    console.log(columnsCount + rowsCount * 100)
}

main()
