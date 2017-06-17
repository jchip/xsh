"use strict";

const shell = require("shcmd");
const util = require("./util");
const assert = require("assert");

function exec(silent) {
  const error = (cmd, code, output) => {
    const err = new Error(`shell cmd '${cmd}' exit code ${code}`);
    err.output = output;
    err.code = code;
    return err;
  };

  const len = arguments.length;
  const cb = arguments[len - 1];
  const sflag = typeof silent === "boolean";
  const hasCb = typeof cb === "function";

  if (!sflag) silent = false;

  const args = Array.prototype.slice.call(arguments, sflag ? 1 : 0, hasCb ? len - 1 : len);

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

  if (hasCb) {
    shell.exec(cmd, { silent }, (code, stdout, stderr) => {
      cb(code !== 0 ? error(cmd, code, { stdout, stderr }) : undefined, { stdout, stderr });
    });
  } else {
    assert(util.Promise, "No Promise available - see doc on setting one");
    return new util.Promise((resolve, reject) => {
      shell.exec(cmd, { silent }, (code, stdout, stderr) => {
        code !== 0 ? reject(error(cmd, code, { stdout, stderr })) : resolve({ stdout, stderr });
      });
    });
  }
}

module.exports = exec;
