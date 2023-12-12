import { fetchInput, splitByLines } from './utils/index.js'

const main = async () => {
    const data = await fetchInput({ day: 12, year: 2023 })

    const records = splitByLines({ input: data }).map(line => {
        const [record, pattern] = line.split(' ')

        return {
            raw: line,
            record: record.split(''),
            pattern: pattern.split(',').map(item => +item)
        }
    })

    const generatePermutations = (n, arr = [], index = 0, result = []) => {
        if (index === n) {
            result.push([...arr])
            return
        }

        arr[index] = '#'
        generatePermutations(n, arr, index + 1, result)

        arr[index] = '.'
        generatePermutations(n, arr, index + 1, result)

        return result
    }

    let totalPermutations = 0

    for (let { record, pattern } of records) {
        let validPermutations = 0

        const dynamicPattern = pattern
            .reduce((acc, group, index) => {
                const isLast = pattern.length - 1 === index

                acc.push(new Array(group).fill('#').join(''))

                if (!isLast) {
                    acc.push('\\.{1,}')
                }

                return acc
            }, [])
            .join('')
        const patternMatch = new RegExp(`^\\.*${dynamicPattern}\\.*$`)

        const permutations = generatePermutations(record.filter(item => item === '?').length)

        for (let permutation of permutations) {
            const recordVariation = record.reduce((acc, item) => {
                let part = item

                if (item === '?') {
                    part = permutation.pop()
                }

                return acc + part
            }, '')

            if (patternMatch.test(recordVariation)) {
                validPermutations += 1
            }
        }

        totalPermutations += validPermutations
    }

    console.log(totalPermutations)
}

main()
