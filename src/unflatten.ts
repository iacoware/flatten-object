export function unflatten(flatObj: Record<string, unknown>) {
    const newObj = {}
    for (const prop of Object.keys(flatObj)) {
        unflattenProp(flatObj, prop, newObj)
    }
    return newObj
}

function unflattenProp(
    flatObj: Record<string, unknown>,
    flatProp: string,
    newObj: object,
) {
    const lastPropValue = flatObj[flatProp]
    const fields = parseFlatProp(flatProp)

    let currentObj = newObj
    for (let i = 0; i < fields.length; i++) {
        const field = fields[i]
        const isLast = i === fields.length - 1
        const nextField = fields[i + 1]
        const nextIsArray = typeof nextField === "number"
        if (field === undefined) throw new Error(cannotHappen)

        if (isLast) {
            currentObj[field] = lastPropValue
        } else {
            if (!currentObj[field]) {
                currentObj[field] = nextIsArray ? [] : {}
            }
            currentObj = currentObj[field]
        }
    }
}

function parseFlatProp(flatProp: string) {
    const props = flatProp.split(".")
    return props.flatMap((prop) => {
        return parseSingleFlatProp(prop)
    })
}

const arrayRegex = /\[(\d+)\]/g
function parseSingleFlatProp(prop: string) {
    const arrayMatches = prop.match(arrayRegex)
    if (!arrayMatches) return [prop]
    return parseFlatArrayProp(prop, arrayMatches)
}

function parseFlatArrayProp(prop: string, arrayMatches: RegExpMatchArray) {
    const openBracketIndex = prop.indexOf("[")
    const arrayIndexes = arrayMatches.map((match) => Number(match.slice(1, -1)))
    return [prop.slice(0, openBracketIndex), ...arrayIndexes]
}

const cannotHappen = "Cannot happen, but TS type inference can't detect it"
