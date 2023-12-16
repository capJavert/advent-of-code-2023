import { fetchInput } from './utils/index.js'

const main = async () => {
    const data = await fetchInput({ day: 15, year: 2023 })

    const items = data.replaceAll('\n', '').split(',').filter(Boolean)

    const getHash = input => {
        let hash = 0

        for (let i = 0; i < input.length; i++) {
            hash += input.charCodeAt(i)
            hash *= 17
            hash = hash % 256
        }

        return hash
    }

    const steps = items.map(item => {
        const operation = item.includes('-') ? '-' : '='
        const [label, lens] = item.split(operation)

        return {
            label,
            lens: +lens,
            op: operation,
            box: getHash(label)
        }
    })

    const boxes = {}

    for (let step of steps) {
        if (!boxes[step.box]) {
            boxes[step.box] = []
        }

        const box = boxes[step.box]

        if (step.op === '=') {
            const existingStep = box.findIndex(item => item.label === step.label)

            if (existingStep === -1) {
                box.push(step)
            } else {
                box.splice(existingStep, 1, step)
            }
        } else if (step.op === '-') {
            boxes[step.box] = box.filter(item => item.label !== step.label)
        } else {
            throw new Error(`unknown operation "${step.op}"`)
        }
    }

    console.log(
        Object.keys(boxes).reduce((acc, boxIndex) => {
            const box = boxes[boxIndex]

            let boxPower = 0

            for (let [index, step] of box.entries()) {
                const stepPower = (1 + +boxIndex) * (index + 1) * step.lens

                boxPower += stepPower
            }

            return acc + boxPower
        }, 0)
    )
}

main()
