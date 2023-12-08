import { fetchInput, splitByLines } from './utils/index.js'

const main = async () => {
    const data = await fetchInput({ day: 7, year: 2023 })

    const handToStrength = {
        five: 6,
        four: 5,
        full: 4,
        three: 3,
        two: 2,
        one: 1,
        high: 0
    }

    const getHand = ({ cards }) => {
        const cardsWithoutJokers = cards.filter(item => item !== 'J')
        const jokersCount = cards.length - cardsWithoutJokers.length
        const uniqueCards = [...new Set(cards)]
        const cardVariants = [cards]

        if (jokersCount > 0) {
            for (let i = 0; i < uniqueCards.length; i += 1) {
                cardVariants.push(cards.map(item => (item === 'J' ? uniqueCards[i] : item)))
            }
        }

        let bestHand = 'unknown'

        const getHandName = cardNumbers => {
            if (Object.values(cardNumbers).some(item => item === 5)) {
                return 'five'
            }

            if (Object.values(cardNumbers).some(item => item === 4)) {
                return 'four'
            }

            if (Object.values(cardNumbers).some(item => item === 3)) {
                if (cardNumbers.some(item => item === 2)) {
                    return 'full'
                }

                return 'three'
            }

            const pairs = Object.values(cardNumbers).filter(item => item === 2)

            if (pairs.length === 2) {
                return 'two'
            }

            if (pairs.length === 1) {
                return 'one'
            }

            return 'high'
        }

        for (let cardsVariant of cardVariants) {
            const cardNumbers = Object.values(
                cardsVariant.reduce((acc, card) => {
                    if (!acc[card]) {
                        acc[card] = 0
                    }

                    acc[card] += 1

                    return acc
                }, {})
            )

            const hand = getHandName(cardNumbers)
            const strength = handToStrength[hand]
            const bestStrength = handToStrength[bestHand] || -1

            if (bestStrength < strength) {
                bestHand = hand
            }
        }

        return bestHand
    }

    const getCardStrength = card => {
        return (
            {
                A: 14,
                K: 13,
                Q: 12,
                J: 1,
                T: 10
            }[card] || +card
        )
    }

    const hands = splitByLines({ input: data }).map(item => {
        const items = item.split(' ')
        const cards = items[0].split('')
        const bid = +items[1]
        const hand = getHand({ cards })

        return {
            raw: items[0],
            cards,
            bid,
            hand,
            strength: handToStrength[hand]
        }
    })

    const sortedHands = hands.sort((a, b) => {
        if (a.strength === b.strength) {
            for (let i = 0; i < 5; i += 1) {
                const sA = getCardStrength(a.cards[i])
                const sB = getCardStrength(b.cards[i])

                if (sA !== sB) {
                    return sA - sB
                }
            }
        }

        return a.strength - b.strength
    })

    console.log(sortedHands.reduce((acc, hand, index) => acc + (index + 1) * hand.bid, 0))
}

main()
