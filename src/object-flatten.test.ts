import { expect, test } from "vitest"

test("simple obj", () => {
    const res = flatten({ a: "a" })
    expect(res).toStrictEqual({ a: "a" })
})

test("nested obj", () => {
    const res = flatten({ a: { b: { c: "z" } } })
    expect(res).toStrictEqual({ "a.b.c": "z" })
})

test("multiple props", () => {
    const res = flatten({ a: "a", b: "b", c: "c" })
    expect(res).toStrictEqual({ a: "a", b: "b", c: "c" })
})

test("simple array", () => {
    const res = flatten({ a: ["a"] })
    expect(res).toStrictEqual({ "a[0]": "a" })
})

type StackItem = { currentObj: object; currentPath: string }

const flatten = (obj: object) => {
    const newObj = {}
    const stack = new Array<StackItem>({ currentObj: obj, currentPath: "" })

    while (stack.length) {
        const { currentObj, currentPath } = stack.pop()!

        if (typeof currentObj !== "object" || currentObj === null) {
            newObj[currentPath] = currentObj
            continue
        }

        for (const key in currentObj) {
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
    const isArray = Array.isArray(currentObj)

    if (!currentPath) return key
    return isArray ? `${currentPath}[${key}]` : `${currentPath}.${key}`
}

function isObjectOrArray(value: unknown) {
    return typeof value === "object" && value !== null
}
