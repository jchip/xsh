"use strict";

const Path = require("path");

module.exports = {
  remove: (p, flags, stripSlash) => {
    const cwd = process.cwd();
    if (stripSlash) {
      const regex = new RegExp(Path.join(cwd, Path.sep), flags);
      p = p.replace(regex, "");
    }
    if (p.indexOf(cwd) >= 0) {
      const regex = new RegExp(cwd, flags);
      return p.replace(regex, "");
    }
    return p;
  },
  replace: (p, str, flags) => {
    if (typeof str !== "string") {
      str = "CWD";
    }
    const regex = new RegExp(process.cwd(), flags);
    return p.replace(regex, str);
  }
};
