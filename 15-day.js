import { fetchInput } from './utils/index.js'

const main = async () => {
    const data = await fetchInput({ day: 15, year: 2023 })

    const steps = data.replaceAll('\n', '').split(',').filter(Boolean)

    const getHash = input => {
        let hash = 0

        for (let i = 0; i < input.length; i++) {
            hash += input.charCodeAt(i)
            hash *= 17
            hash = hash % 256
        }

        return hash
    }

    console.log(steps.reduce((acc, item) => acc + getHash(item), 0))
}

main()
