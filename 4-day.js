import { fetchInput, splitByLines } from './utils/index.js'

const main = async () => {
    const data = await fetchInput({ day: 4, year: 2023 })

    const cards = splitByLines({ input: data }).map(item => {
        const [, items] = item.split(':')

        const [winningNumbers, numbers] = items.split('|')
        return {
            numbers: numbers
                .split(' ')
                .filter(Boolean)
                .map(item => +item),
            winningNumbers: winningNumbers
                .split(' ')
                .filter(Boolean)
                .map(item => +item)
        }
    })

    const points = cards.reduce((acc, card) => {
        const matches = card.numbers.filter(number => card.winningNumbers.includes(number))
        const cardPoints = matches.length ? 2 ** (matches.length - 1) : 0

        return acc + cardPoints
    }, 0)

    console.log(points)
}

main()
