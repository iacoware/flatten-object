type StackItem = { currentObjOrArray: object; currentPath: string }

export const flatten = (objOrArray: object): Record<string, unknown> => {
    const newObj = {}
    const stack = new Array<StackItem>({
        currentObjOrArray: objOrArray,
        currentPath: "",
    })

    while (stack.length > 0) {
        const item = stack.pop()
        if (!item) throw new Error(cannotHappen)
        const { currentObjOrArray, currentPath } = item
        const isArray = Array.isArray(currentObjOrArray)

        for (const key of Object.keys(currentObjOrArray)) {
            const value = currentObjOrArray[key]
            const newPath = getNewPath(isArray, currentPath, key)

            if (isObjectOrArray(value)) {
                // object or array, dig deeper
                stack.push({ currentObjOrArray: value, currentPath: newPath })
            } else {
                // literal value, copy to new object as-is
                newObj[newPath] = value
            }
        }
    }

    return newObj
}

function getNewPath(isArray: boolean, currentPath: string, key: string) {
    if (isArray) return `${currentPath}[${key}]`

    return currentPath ? `${currentPath}.${key}` : key
}

function isObjectOrArray(value: unknown) {
    return (
        typeof value === "object" &&
        value !== null &&
        !(value instanceof Date) &&
        !(value instanceof RegExp)
    )
}

const cannotHappen = "Cannot happen, but TS type inference can't detect it"
