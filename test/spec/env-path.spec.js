"use strict";
const xsh = require("../..");
const chai = require("chai");
const expect = chai.expect;

describe("envPath", function() {
  let save;
  before(() => {
    save = process.env.PATH;
  });

  after(() => {
    process.env.PATH = save;
  });

  it("addToFront should add path to front", function() {
    xsh.envPath.addToFront("/test1");
    expect(process.env.PATH.indexOf("/test1")).to.equal(0);
    delete process.env.PATH;
    xsh.envPath.addToFront("/test1");
    xsh.envPath.addToFront("/test1");
    expect(process.env.PATH).to.equal("/test1");
    xsh.envPath.addToFront("/test2");
    expect(process.env.PATH.indexOf("/test2")).to.equal(0);
    xsh.envPath.addToFront("/test1");
    expect(process.env.PATH.indexOf("/test1")).to.equal(0);
  });

  it("addToEnd should add path to end", function() {
    process.env.PATH = "";
    xsh.envPath.addToEnd("/test1");
    expect(process.env.PATH.indexOf("/test1")).to.equal(0);
    xsh.envPath.addToEnd("/test1");
    xsh.envPath.addToEnd("/test1");
    expect(process.env.PATH).to.equal("/test1");
    xsh.envPath.addToEnd("/test2");
    expect(process.env.PATH.indexOf("/test1")).to.equal(0);
    xsh.envPath.addToEnd("/test1");
    xsh.envPath.addToEnd();
    expect(process.env.PATH.indexOf("/test2")).to.equal(0);
  });

  it("add should add path end if it's not exist", function() {
    process.env.PATH = "/test1:/test2";
    xsh.envPath.add("/test1");
    expect(process.env.PATH).to.equal("/test1:/test2");
    xsh.envPath.add("/test2");
    expect(process.env.PATH).to.equal("/test1:/test2");
    xsh.envPath.add("/test3");
    expect(process.env.PATH).to.equal("/test1:/test2:/test3");
  });
});
