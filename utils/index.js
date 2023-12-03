import fs from 'fs/promises'
import path from 'path'

export const fetchInput = async ({ day, year }) => {
    const fileName = path.join(process.cwd(), `inputs/input-${day}-${year}.txt`)

    try {
        return await fs.readFile(fileName, { encoding: 'utf-8' })
    } catch {
        console.log('no local input, fetching')

        const headers = new Headers()
        headers.append('cookie', `session=${process.env.AOC_SESSION}`)
        headers.append('user-agent', `github.com/capjavert/advent-of-code-${year}`)

        const response = await fetch(`https://adventofcode.com/${year}/day/${day}/input`, {
            method: 'GET',
            headers: headers
        })
        const result = await response.text()

        await fs.writeFile(fileName, result, { encoding: 'utf-8' })

        return result
    }
}

export const splitByLines = ({ input }) => input.split(/\r?\n/).filter(Boolean)
