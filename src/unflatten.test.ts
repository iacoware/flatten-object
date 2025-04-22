import { expect, test } from "vitest"
import { unflatten } from "./unflatten"

test("simple obj", () => {
    const res = unflatten({ a: "a" })
    expect(res).toStrictEqual({ a: "a" })
})

test("nested obj", () => {
    const res = unflatten({ "a.b.c": "z" })
    expect(res).toStrictEqual({ a: { b: { c: "z" } } })
})

test("many nested obj with common prop", () => {
    const res = unflatten({ "a.b.c": "z", "a.b.d": "y" })
    expect(res).toStrictEqual({ a: { b: { c: "z", d: "y" } } })
})

test("multiple props", () => {
    const res = unflatten({ a: "a", b: "b", c: "c" })
    expect(res).toStrictEqual({ a: "a", b: "b", c: "c" })
})
