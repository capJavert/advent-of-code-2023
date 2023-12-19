import { fetchInput, splitByLines } from './utils/index.js'

const workflowMatch = /(?<name>[a-z]{2,}){(?<rules>.*)}/i
const ruleMatch = /(?<part>[a-z]{1,})(?<op>[<>])(?<cond>[0-9]{1,}):(?<res>[a-z]{1,})/i
const partsMatch = /{x=(?<x>[0-9]{1,}),m=(?<m>[0-9]{1,}),a=(?<a>[0-9]{1,}),s=(?<s>[0-9]{1,})}/i

const main = async () => {
    const data = await fetchInput({ day: 19, year: 2023 })
    const lines = splitByLines({ input: data })

    const workflows = lines
        .filter(item => !item.startsWith('{'))
        .reduce((acc, item) => {
            const { name, rules } = item.match(workflowMatch).groups

            acc[name] = {
                name,
                rules: rules.split(',').map(rule => {
                    const { part, op, cond, res = rule } = rule.match(ruleMatch)?.groups || {}

                    return {
                        part,
                        op,
                        cond: +cond,
                        res,
                        noCond: !part
                    }
                })
            }

            return acc
        }, {})

    const parts = lines
        .filter(item => item.startsWith('{'))
        .map(item => {
            const { x, m, a, s } = item.match(partsMatch).groups

            return {
                x: +x,
                m: +m,
                a: +a,
                s: +s
            }
        })

    let acceptedParts = []

    for (let part of parts) {
        let state = 'in'

        while (state !== 'R' && state !== 'A') {
            const workflow = workflows[state]

            for (let rule of workflow.rules) {
                if (rule.noCond) {
                    state = rule.res
                    break
                }

                const { part: partName, op, cond, res } = rule

                const partValue = part[partName]

                if (op === '<' && partValue < cond) {
                    state = res
                    break
                }

                if (op === '>' && partValue > cond) {
                    state = res
                    break
                }
            }
        }

        if (state === 'A') {
            acceptedParts.push(part)
        }
    }

    console.log(acceptedParts.reduce((acc, item) => acc + item.x + item.m + item.a + item.s, 0))
}

main()
