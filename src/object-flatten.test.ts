import { expect, test } from "vitest"

test("it works", () => {
    expect("a").toBe("a")
})

test("simple obj", () => {
    const res = flatten({ a: "a" })
    expect(res).toStrictEqual({ a: "a" })
})

test("nested obj", () => {
    const res = flatten({ a: { b: "z" } })
    expect(res).toStrictEqual({ "a.b": "z" })
})

const flatten = (obj: object) => {
    const finalObj = {}
    for (const key in obj) {
        if (typeof obj[key] === "object") {
            const nestedObj = flatten(obj[key])
            for (const nestedKey in nestedObj) {
                const finalKey = `${key}.${nestedKey}`
                finalObj[finalKey] = nestedObj[nestedKey]
            }
            continue
        }
        const finalKey = key
        finalObj[finalKey] = obj[key]
    }

    return finalObj
}
