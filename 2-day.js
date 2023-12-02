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

    const validGames = games.map(({ rounds }) => {
        const maxColors = rounds.reduce(
            (acc, round) => {
                Object.entries(round).forEach(([key, value]) => {
                    acc[key] = Math.max(acc[key], value)
                })

                return acc
            },
            {
                red: 0,
                blue: 0,
                green: 0
            }
        )

        return maxColors.red * maxColors.blue * maxColors.green
    })

    console.log(validGames.reduce((acc, curr) => acc + curr, 0))
}

main()
