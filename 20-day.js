import { fetchInput, splitByLines } from './utils/index.js'

const main = async () => {
    const data = await fetchInput({ day: 20, year: 2023 })

    const mods = splitByLines({ input: data }).reduce((acc, item) => {
        if (item.startsWith('broadcaster')) {
            acc['broadcaster'] = {
                type: 'broadcaster',
                mods: item.split(' -> ')[1].split(', ')
            }
        } else {
            const [from] = item.split(' -> ')
            const type = from.slice(0, 1)
            const name = from.slice(1)

            acc[name] = {
                type: type === '%' ? 'flip' : 'con',
                mods: item.split(' -> ')[1].split(', '),
                state: type === '%' ? false : {}
            }
        }

        return acc
    }, {})

    for (let [modName, mod] of Object.entries(mods)) {
        if (mod.type !== 'con') {
            const conMods = mod.mods.filter(name => mods[name].type === 'con')

            conMods.forEach(name => {
                mods[name].state = {
                    ...mods[name].state,
                    [modName]: false
                }
            })
        }
    }

    const signals = {
        [true]: 0,
        [false]: 0
    }

    const queue = []

    let i = 0

    const conSignals = {}
    const conInputs = ['ln', 'dr', 'zx', 'vn']

    while (Object.values(conSignals).length < conInputs.length) {
        queue.push({ from: 'button', signal: false, name: 'broadcaster' })

        while (queue.length) {
            const { signal, name: modName, from } = queue.shift()
            const mod = mods[modName]

            signals[signal] += 1

            if (signal && conInputs.includes(from) && modName === 'kj') {
                conSignals[from] = i + 1 // + 1 because each needs to send a signal to kj
            }

            if (!mod) {
                continue
            }

            switch (mod.type) {
                case 'broadcaster': {
                    queue.push(...mod.mods.map(name => ({ from: modName, signal: false, name })))

                    break
                }
                case 'con':
                    {
                        mod.state = {
                            ...mod.state,
                            [from]: signal
                        }

                        const combinedSignal = Object.values(mod.state).every(item => item)

                        queue.push(...mod.mods.map(name => ({ from: modName, signal: !combinedSignal, name })))
                    }
                    break
                case 'flip':
                    {
                        if (!signal) {
                            mod.state = !mod.state

                            queue.push(...mod.mods.map(name => ({ from: modName, signal: mod.state, name })))
                        }
                    }
                    break
                default:
                    throw new Error(`Unknown mod type '${mod.type}'`)
            }
        }

        i += 1
    }

    const gcd = (a, b) => {
        if (b === 0) {
            return a
        }
        return gcd(b, a % b)
    }

    const lcm = (a, b) => (a * b) / gcd(a, b)

    const lcmOfArray = numbers => numbers.reduce((a, b) => lcm(a, b))

    // tnx aoc reddit for the hint
    // https://old.reddit.com/r/adventofcode/comments/18mmfxb/2023_day_20_solutions/kean2eg/
    console.log(lcmOfArray(Object.values(conSignals)))
}

main()
