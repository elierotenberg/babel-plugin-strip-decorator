babel-plugin-strip-decorator
============================

Babel plugin which strips all decorators with the given identifier. Use case in mind is to remove dev-only typechecking
decorators such as [typecheck-decorator](https://github.com/elierotenberg/typecheck-decorator).


### Example

Use the transform as following:

```js
import stripDecorator from 'babel-plugin-strip-decorator';

babel.transform(code, {
  plugins: [{
    // the name of the target decorator has no '@'
    transformer: stripDecorator('devDecorator'),
    // must be applied before es7.decorators transform
    position: 'before',
  }],
});
```

In this case, the following code:

```js
class A {
  @devDecorator()
  method() { ... }
}
```

is transformed into code equivalent to:

```js
class A {
  method() { ... }
}
```

### API

`stripDecorator(...decoratorNames)` **returns** a `babel` plugin which removes all occurences of decorators in the form
`@decoratorName` or `@decoratorName(...)` where `decoratorName` is any string in `decoratorNames`.

```js
babel.transform(code, {
  plugins: [
    { transformer: stripDecorator(
      'decoratorA',
      'decoratorB',
      'decoratorC'
    ), position: 'before' },
  ],
});
```

This will remove all occurences of decorators named either `decoratorA`, `decoratorB` or `decoratorC`.

### Notes

This plugin is intentionally dumb and simple. It looks for a decorator with a given string identifier. It doesn't care
whether this decorator actually exists or whatever. This is a feature, not a bug, eg. you can have 2 references to the same
decorator (eg. `@prodTypecheck` and `@devTypecheck` both mapping to `@typecheck`)
but only strip one (eg. strip `@devTypecheck` but leave `@prodTypecheck`).

Also note that the decorator invokation is completely stripped away.
Any side effects caused by the then-stripped decorator invokation is also removed
(relying on such a side effect would probably be a code smell in the first place anyway though).

For example the following code would break if `stripDecorator('causeSideEffect')` is applied:

```js
let a = 0;
class A {
  @causeSideEffect(a = a + 1)
  test() { ... }
}
assert(a === 1); // will throw only if stripDecorator('causeSideEffect') is applied
```
