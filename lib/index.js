"use strict";

const util = require("./util");

const xsh = {
  exec: require("./exec"),
  envPath: require("./env-path"),
  mkCmd: require("./mkcmd"),
  $: require("shcmd")
};

Object.defineProperty(xsh, "Promise", {
  set: p => {
    util.Promise = p || Promise;
  },
  get: () => util.Promise
});

module.exports = xsh;
