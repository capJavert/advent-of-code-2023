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

    const chunkSize = 2
    const seedRanges = []
    for (let i = 0; i < seeds.length; i += chunkSize) {
        const chunk = seeds.slice(i, i + chunkSize)
        seedRanges.push(chunk)
    }

    const rangesCounts = rangeMaps.length

    let minLocation = Infinity

    for (let seedRange of seedRanges) {
        const [a, b] = seedRange

        for (let i = a; i < a + b; i += 1) {
            let transformedSeed = i

            for (let j = 0; j < rangesCounts; j += 1) {
                const rangeMap = rangeMaps[j]

                for (let k = 0; k < rangeMap.length; k += 1) {
                    const range = rangeMap[k]

                    if (range.sourceStart <= transformedSeed && range.sourceStart + range.range > transformedSeed) {
                        transformedSeed = range.destinationStart + (transformedSeed - range.sourceStart)
                        break
                    }
                }
            }
            minLocation = Math.min(minLocation, transformedSeed)
        }
    }

    console.log(minLocation)
}

main()
