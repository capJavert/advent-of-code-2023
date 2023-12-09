import { fetchInput, splitByLines } from './utils/index.js'

const main = async () => {
    const data = await fetchInput({ day: 9, year: 2023 })

    const history = splitByLines({ input: data }).map(item => item.split(' ').map(Number))

    history.forEach(item => {
        let timeline = item
        const timelines = [timeline]

        while (true) {
            let endOfTime = true

            timeline = timeline.reduce((acc, item, index) => {
                if (index === 0) {
                    return acc
                }

                const previous = timeline[index - 1]
                const diff = item - previous
                acc.push(diff)

                if (diff !== 0) {
                    endOfTime = false
                }

                return acc
            }, [])

            timelines.push(timeline)

            if (endOfTime) {
                break
            }
        }

        let next = 0

        for (let i = timelines.length - 2; i >= 0; i -= 1) {
            const current = timelines[i]
            const value = current[current.length - 1] + next
            next = value
        }

        item.push(next)
    })

    console.log(history.reduce((acc, item) => acc + item[item.length - 1], 0))
}

main()
