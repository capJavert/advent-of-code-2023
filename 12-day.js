import { fetchInput, splitByLines } from './utils/index.js'

const main = async () => {
    const data = await fetchInput({ day: 12, year: 2023 })

    const records = splitByLines({ input: data }).map(line => {
        let [record, pattern] = line.split(' ')

        // record = new Array(5).fill(record).join('?')
        // pattern = new Array(5).fill(pattern).join(',')

        return {
            record: record,
            pattern: pattern.split(',').map(item => +item)
        }
    })

    const cache = new Map()

    // thanks https://topaz.github.io/paste/#XQAAAQAOBgAAAAAAAAA0m0pnuFI8c9Ax53b7qCU52PeXXOG1YE1u3tBJ8qyQQ3YX2HlBNXQmThhoiOTt8+x4biO6pww09Axe02UUZPQm26AY+02MRPgx48g1tGMcSE7Wd2q2+FlDDJTu16B7s1/Wiq2sTKbz0SmKyJgevSaaAUW5YvE4eAoD3iEPl6MtA6UdZ2AnyPRRo7tTdVGOJ88drzqaq/1Kx0Dsay03Xj2p9tW6Y76gqPv7WzIc9Wc89VrYIkmsKXsk6QtszOy2eu5+KeVsvzsZPA964DwELUITOThrANDNmjQMjZRxDB8yTDASC/h7JVhpH1NjEiI8QNFzxWId73HCjtq7DuT8qruXDlsbLWFl7n+O8VPGob8PtFsHka31Zy81FQeiCCJSW36Md81adlZ+klTzPlafQ0/KrIF5UX1KSzEl8bghvx416jjewnwJZcfh047zegtLn3L4AirPrmiL7Ggyuub3XP4tQvfFL/gm2Y+U0Hl0xu3HmEpM4wB9LE0an3NJMCvIBVllP/zGBVWCVQO/wYRfMZR9QN0DnaDQ/sOt+caw2ar6DwGLn7eG1YcEVyRAe0uoaIDStc5FWqI8Jpj3xGbFcDTO+/UchiqZ5VKbNNmBf8JoJcVKYMNES0oU3cBafskOSVyWXcJ0pj6unzQViw/O5yjuqVfvipmztrF+Z20XQEYGdXw75F/N16LWPSZcMEDEBAakJwNzMOC5HfFxvkW+aXrewytCNvvlMQiWpuAQBNzMYWtFJ2yA0hj3ctTPKozzgrbzH0oCiWoUcApZRpA0gu42pu38ZC4zf5ZAAVgYPZ4avsFg4qhi6FbWqFoKtuuoQxe7HeQ1/5U2IiU=
    // for inspiration good example of dynamic programming
    // and splitting work to be cacheable
    const getPermutations = (record, pattern) => {
        record = record.replace(/^\.+|\.+$/, '')
        if (record === '') return pattern.length ? 0 : 1
        if (!pattern.length) return record.includes('#') ? 0 : 1
        const key = `${record}-${pattern}`

        if (cache.has(key)) {
            return cache.get(key)
        }

        let permutations = 0
        const damaged = record.match(/^#+(?=\.|$)/)

        if (damaged) {
            if (damaged[0].length === pattern[0]) {
                permutations += getPermutations(record.slice(pattern[0]), pattern.slice(1))
            }
        } else if (record.includes('?')) {
            const totalDamagedParts = pattern.reduce((acc, item) => acc + item, 0)
            permutations += getPermutations(record.replace('?', '.'), pattern)

            if ((record.match(/#/g) || []).length < totalDamagedParts) {
                permutations += getPermutations(record.replace('?', '#'), pattern)
            }
        }

        cache.set(key, permutations)

        return permutations
    }

    const totalPermutations = records.reduce((acc, { record, pattern }) => {
        return acc + getPermutations(record, pattern)
    }, 0)

    console.log(totalPermutations)
}

main()
