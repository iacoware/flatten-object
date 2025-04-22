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

test("simple array", () => {
    const res = unflatten({ "a[0]": "a" })
    expect(res).toStrictEqual({ a: ["a"] })
})

test("simple array, many items", () => {
    const res = unflatten({ "a[0]": "a", "a[1]": "b", "a[2]": "c" })
    expect(res).toStrictEqual({ a: ["a", "b", "c"] })
})

test("object array", () => {
    const res = unflatten({ "a[0].b": "z" })
    expect(res).toStrictEqual({ a: [{ b: "z" }] })
})

test("nested array", () => {
    const res = unflatten({ "a[0][0]": "b" })
    expect(res).toStrictEqual({ a: [["b"]] })
})

test("array of objects with nested arrays", () => {
    const res = unflatten({ "a[0].b[0]": "x", "a[0].b[1]": "y" })
    expect(res).toStrictEqual({ a: [{ b: ["x", "y"] }] })
})
