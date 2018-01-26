"use strict";
const xsh = require("../..");
const chai = require("chai");
const expect = chai.expect;
const Path = require("path");

describe("envPath", function() {
  let save;
  const pathKey = xsh.envPath.envKey;
  before(() => {
    save = process.env[pathKey];
  });

  after(() => {
    process.env[pathKey] = save;
  });

  it("should add to a custom env/path", function() {
    let path = xsh.envPath.add("foo", ["test", "blah"].join(Path.delimiter));
    expect(path).to.equal(["test", "blah", "foo"].join(Path.delimiter));
    const env = {};
    path = xsh.envPath.add("foo", env);
    expect(path).to.equal("foo");
    expect(env).to.deep.equal({ [pathKey]: "foo" });
    path = xsh.envPath.add("", env);
    expect(env[pathKey]).to.equal("foo");
  });

  it("addToFront should add path to front", function() {
    xsh.envPath.addToFront("/test1");
    expect(process.env[pathKey].indexOf("/test1")).to.equal(0);
    delete process.env[pathKey];
    xsh.envPath.addToFront("/test1");
    xsh.envPath.addToFront("/test1");
    expect(process.env[pathKey]).to.equal("/test1");
    xsh.envPath.addToFront("/test2");
    expect(process.env[pathKey].indexOf("/test2")).to.equal(0);
    xsh.envPath.addToFront("/test1");
    expect(process.env[pathKey].indexOf("/test1")).to.equal(0);
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
    process.env[pathKey] = "";
    xsh.envPath.addToEnd("/test1");
    expect(process.env[pathKey].indexOf("/test1")).to.equal(0);
    xsh.envPath.addToEnd("/test1");
    xsh.envPath.addToEnd("/test1");
    expect(process.env[pathKey]).to.equal("/test1");
    xsh.envPath.addToEnd("/test2");
    expect(process.env[pathKey].indexOf("/test1")).to.equal(0);
    xsh.envPath.addToEnd("/test1");
    xsh.envPath.addToEnd();
    expect(process.env[pathKey].indexOf("/test2")).to.equal(0);
  });

  it("add should add path end if it's not exist", function() {
    const p1 = Path.normalize("/test1");
    const p2 = Path.normalize("/test2");
    const p3 = Path.normalize("/test3");
    const r1 = [p1, p2].join(Path.delimiter);
    const r2 = [p1, p2, p3].join(Path.delimiter);
    process.env[pathKey] = r1;
    xsh.envPath.add(p1);
    expect(process.env[pathKey]).to.equal(r1);
    xsh.envPath.add(p2);
    expect(process.env[pathKey]).to.equal(r1);
    xsh.envPath.add(p3);
    expect(process.env[pathKey]).to.equal(r2);
  });

  it("findEnvKey should find correct path env key", function() {
    const defaultKey = xsh.envPath.findEnvKey(process.env);
    expect(defaultKey.toLowerCase()).to.equal("path");
    expect(defaultKey).to.equal(xsh.envPath.envKey);
  });
});
