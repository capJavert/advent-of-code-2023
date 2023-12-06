import { fetchInput, splitByLines } from './utils/index.js'

const main = async () => {
    const data = await fetchInput({ day: 6, year: 2023 })

    const [times, distances] = splitByLines({ input: data }).map(item => {
        return item
            .split(' ')
            .map(item => +item)
            .filter(Boolean)
    })

    let winningStrategies = 1

    for (let i = 0; i < times.length; i++) {
        const time = times[i]
        const distance = distances[i]
        let winningStrategiesCount = 0

        for (let j = 0; j <= time; j++) {
            const remainingTime = time - j
            const traveledDistance = j * remainingTime

            if (traveledDistance > distance) {
                winningStrategiesCount += 1
            }
        }

        winningStrategies *= winningStrategiesCount
    }

    console.log(winningStrategies)
}

main()
