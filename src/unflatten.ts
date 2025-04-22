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
        const isLast = i === fields.length - 1
        const field = fields[i]
        const nextField = fields[i + 1]
        const nextIsArray = typeof nextField === "number"
        if (field === undefined)
            throw new Error(
                "Cannot happen, but TS type inference can't detect it",
            )

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

const arrayRegex = /\[(\d+)\]$/
function parseFlatProp(flatProp: string) {
    const props = flatProp.split(".")
    return props.flatMap((prop) => {
        const match = prop.match(arrayRegex)
        if (match) {
            const [, index] = match
            return [prop.slice(0, match.index), Number(index)]
        } else {
            return [prop]
        }
    })
}
