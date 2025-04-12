import { expect, test } from "vitest"

test("it works", () => {
    expect("a").toBe("a")
})

test("simple obj", () => {
    const res = flatten({ a: "a" })
    expect(res).toStrictEqual({ a: "a" })
})

const flatten = (obj: object) => {
    const keys = Object.keys(obj)

    const finalObj = {}
    for (const key of keys) {
        const finalKey = key
        const finalValue = obj[key]
        finalObj[finalKey] = finalValue
    }

    return obj
}
