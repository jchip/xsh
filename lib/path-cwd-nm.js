"use strict";

const pathCwd = require("./path-cwd");
const Path = require("path");
const normNm = Path.normalize("/node_modules/");
const normNmReplacer = Path.normalize("/~/");
module.exports = {
  remove: (p, flags) => {
    const nmRegex = new RegExp(Path.resolve("node_modules"), flags || "");
    return pathCwd.remove(p.replace(nmRegex, ""), flags);
  },
  replace: (p, str, flags) => {
    if (typeof str !== "string") {
      str = "CWD/~";
    }
    const nmRegex = new RegExp(Path.resolve("node_modules"), flags || "");
    p = pathCwd.replace(p.replace(nmRegex, str), null, flags);
    return p.replace(new RegExp(normNm, flags), normNmReplacer);
  }
};
