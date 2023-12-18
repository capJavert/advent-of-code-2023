import { fetchInput, splitByLines } from './utils/index.js'

const main = async () => {
    const data = await fetchInput({ day: 18, year: 2023 })

    const hexToDirection = {
        0: 'R',
        1: 'D',
        2: 'L',
        3: 'U'
    }

    const plan = splitByLines({ input: data }).map(row => {
        const parts = row.split(' ')
        const color = parts[2].replace(/\(|\)|#/g, '')
        const direction = hexToDirection[parseInt(color.slice(5), 16)]
        const meters = parseInt(color.slice(0, 5), 16)

        return {
            direction,
            meters,
            color
        }
    })

    const hole = []
    let x = 0
    let y = 0
    hole.push({ x, y })
    const directionToCoord = {
        R: [1, 0],
        L: [-1, 0],
        U: [0, -1],
        D: [0, 1]
    }

    let minX = Infinity
    let maxX = 0
    let minY = Infinity
    let maxY = 0

    let perimeter = 0

    for (let i = 0; i < plan.length; i++) {
        const { direction, meters } = plan[i]

        const [dx, dy] = directionToCoord[direction]

        x += dx * meters
        y += dy * meters

        hole.push({ x, y })
        perimeter += meters

        minX = Math.min(minX, x)
        maxX = Math.max(maxX, x)
        minY = Math.min(minY, y)
        maxY = Math.max(maxY, y)
    }

    const shoelaceAlgorithm = points => {
        let area = 0
        for (let i = 0; i < points.length; i++) {
            let j = (i + 1) % points.length
            area += points[i].x * points[j].y
            area -= points[j].x * points[i].y
        }
        return Math.abs(area / 2)
    }

    // pick's theorem
    // https://en.wikipedia.org/wiki/Pick%27s_theorem
    console.log(shoelaceAlgorithm(hole) + perimeter / 2 + 1)
}

main()
