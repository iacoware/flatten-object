export function unflatten(flatObj: Record<string, unknown>) {
    const newObj = {}
    for (const key of Object.keys(flatObj)) {
        const value = flatObj[key]
        const fields = key.split(".")

        let currentObj = newObj
        for (let i = 0; i < fields.length; i++) {
            const isLast = i === fields.length - 1
            const field = fields[i]
            if (field === undefined)
                throw new Error(
                    "Cannot happen, but TS type inference can't detect it",
                )

            if (isLast) {
                currentObj[field] = value
            } else {
                if (!currentObj[field]) {
                    currentObj[field] = {}
                }
                currentObj = currentObj[field]
            }
        }
    }
    return newObj
}
