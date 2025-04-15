import { expect, test } from "vitest"
import { flatten } from "./flatten"

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

test("simple array, many items", () => {
    const res = flatten({ a: ["a", "b", "c"] })
    expect(res).toStrictEqual({ "a[0]": "a", "a[1]": "b", "a[2]": "c" })
})

test("object array", () => {
    const res = flatten({ a: [{ b: "z" }] })
    expect(res).toStrictEqual({ "a[0].b": "z" })
})

test("nested array", () => {
    const res = flatten({ a: [["b"]] })
    expect(res).toStrictEqual({ "a[0][0]": "b" })
})

test("Date prop", () => {
    const now = new Date()
    const res = flatten({ a: now })
    expect(res).toStrictEqual({ a: now })
})

test("RegExp prop", () => {
    const res = flatten({ a: /abc/ })
    expect(res).toStrictEqual({ a: /abc/ })
})

test("array", () => {
    const res = flatten(["a"])
    expect(res).toStrictEqual({ "[0]": "a" })
})
