"use strict";
const xsh = require("../..");
const chai = require("chai");
const expect = chai.expect;
const Path = require("path");

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

  it("addToFront should add path to front of a path", function() {
    let PATH;
    PATH = xsh.envPath.addToFront("/test1", PATH);
    expect(PATH.indexOf("/test1")).to.equal(0);
    PATH = xsh.envPath.addToFront("/test1", {});
    PATH = xsh.envPath.addToFront("/test1", PATH);
    expect(PATH).to.equal("/test1");
    PATH = xsh.envPath.addToFront("/test2", PATH);
    expect(PATH.indexOf("/test2")).to.equal(0);
    PATH = xsh.envPath.addToFront("/test1", PATH);
    expect(PATH.indexOf("/test1")).to.equal(0);
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
    const p1 = Path.normalize("/test1");
    const p2 = Path.normalize("/test2");
    const p3 = Path.normalize("/test3");
    const r1 = [p1, p2].join(Path.delimiter);
    const r2 = [p1, p2, p3].join(Path.delimiter);
    process.env.PATH = r1;
    xsh.envPath.add(p1);
    expect(process.env.PATH).to.equal(r1);
    xsh.envPath.add(p2);
    expect(process.env.PATH).to.equal(r1);
    xsh.envPath.add(p3);
    expect(process.env.PATH).to.equal(r2);
  });
});
