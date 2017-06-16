"use strict";

module.exports = {
  remove: (p, flags) => {
    const regex = new RegExp(process.cwd(), flags || "");
    return p.replace(regex, "");
  },
  replace: (p, str, flags) => {
    if (typeof str !== "string") {
      str = "CWD";
    }
    const regex = new RegExp(process.cwd(), flags || "");
    return p.replace(regex, str);
  }
};
