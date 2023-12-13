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

    const findReflecion = (items, smudgedReflection) => {
        for (let i = 0; i < items.length; i++) {
            const item = items[i]
            const next = items[i + 1]

            if (!next) {
                break
            }

            if (item === next) {
                for (let j = 0; j < items.length; j++) {
                    if (!items[i - j] || !items[i + 1 + j]) {
                        if (smudgedReflection && smudgedReflection === i + 1) {
                            break
                        }

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

    patterns.forEach(({ rows, columns }) => {
        let smudgedType = 'rows'
        let smudgedReflection = findReflecion(rows)

        if (!smudgedReflection) {
            smudgedReflection = findReflecion(columns)
            smudgedType = 'columns'
        }

        for (let i = 0; i < rows.length; i++) {
            for (let j = 0; j < rows[0].length; j++) {
                const newRows = [...rows]
                const newColumns = [...columns]

                const smudge = newRows[i][j] === '#' ? '.' : '#'
                newRows[i] = newRows[i].substring(0, j) + smudge + newRows[i].substring(j + 1)
                newColumns[j] = newColumns[j].substring(0, i) + smudge + newColumns[j].substring(i + 1)

                let reflection = findReflecion(newRows, smudgedType === 'rows' ? smudgedReflection : undefined)

                if (!reflection) {
                    reflection = findReflecion(newColumns, smudgedType === 'columns' ? smudgedReflection : undefined)

                    if (reflection) {
                        columnsCount += reflection
                        return
                    }
                } else if (reflection) {
                    rowsCount += reflection
                    return
                }
            }
        }
    })

    console.log(columnsCount + rowsCount * 100)
}

main()
