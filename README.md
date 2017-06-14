# xsh

Some random NodeJS helper functions for shell execution

## Install

```bash
npm install xsh --save-dev
```

```js
const xsh = require("xsh");

xsh.exec("echo hello");
```

## API

### `Promise`

You can set a custom `Promise` with:

```js
xsh.Promise = require("bluebird");
```

Or set to the native `Promise` with:

```js
xsh.Promise = null;
```

### [mkCmd](#mkcmd)

```js
xsh.mkCmd(["echo", "hello"]);
xsh.mkCmd("echo", "hello");
```

Both return the string `"echo hello"`.

### [exec](#exec)

```js
xsh.exec( [silent: true|false], shellCommand, [callback] );
```

Use [shelljs] `exec` to execute `shellCommand`.

If callback is provided, it will be called as follows:

`callback( code !== 0 ? new Error("...") : undefined, { stdout, stderr } )`

`error.output` is set to `{ stdout, stderr}`.
`error.code` is set to `code`.

If no callback is provided, it will return a `Promise` that rejects with the error or resolve with `{ stdout, stderr }`.

#### Arguments

-   `silent` - If the first argument is either `true` or `false`, it turns on/off output to console.

-   `shellCommand` - can be combination of multiple strings and arrays.  Array is joined with `" "` into strings.  All final strings are joined with `" "`.

### [envPath.addToFront](#envpathaddtofront)

```js
xsh.envPath.addToFront(path);
```

Add `path` to the front of `process.env.PATH`.  If it already exists, then it is moved to the front.

### [envPath.addToEnd](#envpathaddtoend)

```js
xsh.envPath.addToEnd(path);
```

Add `path` to the end of `process.env.PATH`.  If it already exists, then it is moved to the end.

### [envPath.add](#envpathadd)

```js
xsh.envPath.add(path);
```

If `path` doesn't exist in `process.env.PATH` then it's added to the end.

### [`$`](#)

An instance of [shelljs].

```js
const xsh = require("xsh");
xsh.$.cd("/tmp");
```

[shelljs]: https://github.com/shelljs/shelljs
