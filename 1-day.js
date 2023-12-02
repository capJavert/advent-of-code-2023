import { fetchInput, splitByLines } from './utils/index.js'

const main = async () => {
    const data = await fetchInput({ day: 1, year: 2023 })
    const input = splitByLines({ input: data })
    const regexNumMatch = /([0-9]|one|two|three|four|five|six|seven|eight|nine)/g
    const numTextMap = {
        one: 1,
        two: 2,
        three: 3,
        four: 4,
        five: 5,
        six: 6,
        seven: 7,
        eight: 8,
        nine: 9
    }

    const matchDigits = ({ value }) => {
        let match = undefined
        const matches = []

        while ((match = regexNumMatch.exec(value)) !== null) {
            matches.push(match[0])
            regexNumMatch.lastIndex = match.index + 1 // This is the key part to get overlapping matches
        }

        return matches
    }

    const numbers = input.map(line => {
        const matches = matchDigits({ value: line })
            .filter(Boolean)
            .map(item => numTextMap[item] || item)

        return +`${matches[0]}${matches[matches.length - 1] || matches[0]}`
    })

    console.log(numbers.reduce((acc, curr) => acc + curr, 0))
}

main()
