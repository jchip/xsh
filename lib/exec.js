"use strict";

const shell = require("shcmd");
const util = require("./util");
const assert = require("assert");

function exec(options) {
  const error = (cmd, code, output) => {
    const err = new Error(`shell cmd '${cmd}' exit code ${code}`);
    err.output = output;
    err.code = code;
    return err;
  };

  const len = arguments.length;
  const cb = arguments[len - 1];
  const hasCb = typeof cb === "function";
  const optType = options.constructor.name;
  const hasOptions = optType === "Boolean" || optType === "Object";
  if (!hasOptions) {
    options = { silent: false };
  } else if (optType === "Boolean") {
    options = { silent: options };
  }

  const args = Array.prototype.slice.call(arguments, hasOptions ? 1 : 0, hasCb ? len - 1 : len);

  if (args.length < 1) {
    throw new Error("exec expects a command");
  }

  let s = "";
  const cmd = args.reduce((a, x) => {
    if (Array.isArray(x)) {
      x = x.join(" ");
    } else if (typeof x !== "string") {
      throw new Error("command fragment must be an array or string");
    }
    a = `${a}${s}${x}`;
    s = " ";
    return a;
  }, "");

  options.async = true;

  const doExec = xcb =>
    shell.exec(cmd, options, (code, stdout, stderr) => {
      const output = { stdout, stderr };
      const err = code === 0 ? null : error(cmd, code, output);
      xcb(err, output);
    });

  if (hasCb) {
    return doExec(cb);
  }

  let child;

  assert(util.Promise, "No Promise available - see doc on setting one");
  const promise = new util.Promise((resolve, reject) => {
    child = doExec((err, output) => (err ? reject(err) : resolve(output)));
  });

  return {
    then: (a, b) => promise.then(a, b),
    catch: a => promise.catch(a),
    promise,
    child,
    stdout: child.stdout,
    stderr: child.stderr
  };
}

module.exports = exec;
