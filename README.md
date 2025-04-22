# Implementation of `flatten` and `unflatten` for objects
 It's meant to be copied into a project, not to be used as a dependency. There's no package!

### Flatten
```typescript
const obj = {
  a: {
    b: {
      c: "The answer",
      d: ["is", "always", "42"],
    },
  },
}

const flat = flatten(obj);
/*{
    "a.b.c": "The answer",
    "a.b.d[0]": "is",   
    "a.b.d[1]": "always",   
    "a.b.d[2]": "42"   
}*/

```

### Unflatten
```typescript
const obj = {
    "a.b.c": "The answer",
    "a.b.d[0]": "is",   
    "a.b.d[1]": "always",   
    "a.b.d[2]": "42"   
}

const flat = unflatten(obj);
/*{
  a: {
    b: {
      c: "The answer",
      d: ["is", "always", "42"],
    },
  },
}*/