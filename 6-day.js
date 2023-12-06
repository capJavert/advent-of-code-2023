import { fetchInput, splitByLines } from './utils/index.js'

const main = async () => {
    const data = await fetchInput({ day: 6, year: 2023 })

    const [time, distance] = splitByLines({ input: data }).map(item => {
        return +item
            .split(' ')
            .map(item => +item)
            .filter(Boolean)
            .join('')
    })

    let winningStrategies = 0

    for (let j = 0; j <= time; j++) {
        const remainingTime = time - j
        const traveledDistance = j * remainingTime

        if (traveledDistance > distance) {
            winningStrategies += 1
        }
    }

    console.log(winningStrategies)
}

main()
