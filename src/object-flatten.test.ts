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

        const isArray = Array.isArray(currentObj)

        for (const key in currentObj) {
            const value = currentObj[key]
            const newPath = getNewPath(currentPath, isArray, key)

            if (
                typeof value === "object" &&
                value !== null &&
                !Array.isArray(value)
            ) {
                stack.push({ currentObj: value, currentPath: newPath })
            } else if (Array.isArray(value)) {
                stack.push({ currentObj: value, currentPath: newPath })
            } else {
                newObj[newPath] = value
            }
        }
    }

    /*for (const key in obj) {
        if (typeof obj[key] === "object") {
            const nestedObj = flatten(obj[key])
            for (const nestedKey in nestedObj) {
                const finalKey = `${key}.${nestedKey}`
                newObj[finalKey] = nestedObj[nestedKey]
            }
        } else {
            newObj[key] = obj[key]
        }
    }*/

    return newObj
}

function getNewPath(currentPath: string, isArray: boolean, key: string) {
    return currentPath
        ? isArray
            ? `${currentPath}[${key}]`
            : `${currentPath}.${key}`
        : key
}
