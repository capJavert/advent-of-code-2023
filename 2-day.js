import { fetchInput, splitByLines } from './utils/index.js'

const main = async () => {
    const data = await fetchInput({ day: 2, year: 2023 })
    const input = splitByLines({ input: data })

    const games = input.map((line, index) => {
        const data = line
            .split(':')[1]
            .split(';')
            .map(item => item.trim())

        return {
            id: index + 1,
            rounds: data.map(item => {
                return item
                    .split(',')
                    .map(item => item.trim())
                    .reduce(
                        (acc, item) => {
                            const [number, color] = item.split(' ')
                            acc[color] += +number

                            return acc
                        },
                        {
                            red: 0,
                            blue: 0,
                            green: 0
                        }
                    )
            })
        }
    })

    const validGames = games.filter(({ rounds }) => {
        return rounds.every(item => {
            const { red, blue, green } = item

            return red <= 12 && green <= 13 && blue <= 14
        })
    })

    console.log(validGames.reduce((acc, curr) => acc + curr.id, 0))
}

main()
