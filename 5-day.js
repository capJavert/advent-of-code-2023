import { fetchInput, splitByLines } from './utils/index.js'

const main = async () => {
    const data = await fetchInput({ day: 5, year: 2023 })
    const [seedsMap, ...restMaps] = data.split('\n\n')

    const seeds = seedsMap
        .split(':')[1]
        .split(' ')
        .filter(Boolean)
        .map(item => +item)

    const rangeMaps = restMaps.map(map => {
        const [, items] = map.split(':')

        const lines = splitByLines({ input: items }).map(item =>
            item
                .split(' ')
                .filter(Boolean)
                .map(item => +item)
        )

        const ranges = lines.map(line => {
            const [destinationStart, sourceStart, range] = line

            return {
                destinationStart,
                sourceStart,
                range
            }
        })

        return ranges
    })

    let transformedSeeds = [...seeds]

    for (let rangeMap of rangeMaps) {
        transformedSeeds = transformedSeeds.map(seed => {
            const range = rangeMap.find(range => range.sourceStart <= seed && range.sourceStart + range.range >= seed)

            if (range) {
                return range.destinationStart + (seed - range.sourceStart)
            }

            return seed
        })
    }

    console.log(Math.min(...transformedSeeds))
}

main()
