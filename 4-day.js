import { fetchInput, splitByLines } from './utils/index.js'

const main = async () => {
    const data = await fetchInput({ day: 4, year: 2023 })

    const startingCards = splitByLines({ input: data }).reduce((acc, item, index) => {
        const [, items] = item.split(':')

        const id = index + 1
        const [winningNumbers, numbers] = items.split('|')

        const card = {
            id,
            numbers: numbers
                .split(' ')
                .filter(Boolean)
                .map(item => +item),
            winningNumbers: winningNumbers
                .split(' ')
                .filter(Boolean)
                .map(item => +item)
        }
        const matches = card.numbers.filter(number => card.winningNumbers.includes(number))

        return {
            ...acc,
            [id]: {
                ...card,
                matches
            }
        }
    }, {})

    Object.values(startingCards).forEach(card => {
        card.newCards = []

        card.matches.forEach((match, index) => {
            card.newCards.push(startingCards[card.id + index + 1])
        })
    })

    let cards = Object.values(startingCards)
    let cardsCount = cards.length

    while (true) {
        let didMatch = false
        let newCards = []

        cards.forEach(card => {
            cardsCount += card.newCards.length
            newCards.push(...card.newCards)

            if (card.newCards.length) {
                didMatch = true
            }
        })

        if (!didMatch) {
            break
        }

        cards = newCards
    }

    console.log(cardsCount)
}

main()
