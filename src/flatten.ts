type StackItem = { currentObj: object; currentPath: string }

export const flatten = (obj: object): Record<string, unknown> => {
    const newObj = {}
    const stack = new Array<StackItem>({ currentObj: obj, currentPath: "" })

    while (stack.length) {
        const { currentObj, currentPath } = stack.pop()!

        for (const key of Object.keys(currentObj)) {
            const value = currentObj[key]
            const newPath = getNewPath(currentObj, currentPath, key)

            if (isObjectOrArray(value)) {
                stack.push({ currentObj: value, currentPath: newPath })
            } else {
                newObj[newPath] = value
            }
        }
    }

    return newObj
}

function getNewPath(currentObj: object, currentPath: string, key: string) {
    if (!currentPath) return Array.isArray(currentObj) ? `[${key}]` : key

    return Array.isArray(currentObj)
        ? `${currentPath}[${key}]`
        : `${currentPath}.${key}`
}

function isObjectOrArray(value: unknown) {
    return (
        typeof value === "object" &&
        value !== null &&
        !(value instanceof Date) &&
        !(value instanceof RegExp)
    )
}
