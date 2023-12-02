import { fetchInput, splitByLines } from './utils/index.js'

const main = async () => {
    const data = await fetchInput({ day: 1, year: 2023 })
    const input = splitByLines({ input: data })
    const regexNumMatch = /[0-9]/g

    const numbers = input.map(line => {
        const matches = line.match(regexNumMatch).filter(Boolean)

        return +`${matches[0]}${matches[matches.length - 1] || matches[0]}`
    })

    console.log(numbers.reduce((acc, curr) => acc + curr, 0))
}

main()
