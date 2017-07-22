"use strict";

const Path = require("path");
const pathDelim = Path.delimiter;

function check(env) {
  if (typeof env === "string") {
    env = { PATH: env };
  } else if (!env) {
    env = process.env;
  }

  if (typeof env.PATH !== "string") {
    env.PATH = "";
  }

  return env;
}

function addToFront(p, env) {
  env = check(env);

  if (typeof p === "string" && p && env.PATH.indexOf(p) !== 0) {
    const paths = env.PATH.split(pathDelim).filter(x => x && x !== p);
    paths.unshift(p);
    env.PATH = paths.join(pathDelim);
  }

  return env.PATH;
}

function addToEnd(p, env) {
  env = check(env);

  if (typeof p === "string" && p) {
    const paths = env.PATH.split(pathDelim).filter(x => x && x !== p);
    paths.push(p);
    env.PATH = paths.join(pathDelim);
  }

  return env.PATH;
}

function add(p, env) {
  env = check(env);

  if (typeof p === "string" && p && env.PATH.indexOf(p) < 0) {
    env.PATH = `${env.PATH}${pathDelim}${p}`;
  }

  return env.PATH;
}

module.exports = {
  addToFront,
  addToEnd,
  add
};
