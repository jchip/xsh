"use strict";
const xsh = require("../..");
const chai = require("chai");
const expect = chai.expect;

describe("exec", function() {
  const expectUnknownCmdSig = process.platform === "win32" ? "is not recognized" : "not found";

  it("should failed for unknown command", function(done) {
    xsh.exec("unknown_command", function(err, output) {
      expect(err).to.be.ok;
      expect(err.output.stderr).equals(output.stderr);
      expect(output.stderr).includes(expectUnknownCmdSig);
      done();
    });
  });

  it("should failed for unknown command @Promise", function() {
    return xsh
      .exec("unknown_command")
      .then(() => {
        throw new Error("expected failure");
      })
      .catch(err => {
        expect(err.output.stderr).includes(expectUnknownCmdSig);
      });
  });

  it("should execute command", function(done) {
    xsh.exec("echo hello, world", function(err, output) {
      expect(err).to.be.not.ok;
      expect(output.stdout.trim()).to.equal("hello, world");
      done();
    });
  });

  it("should execute command with output silent", function(done) {
    xsh.exec(false, "echo hello, world", function(err, output) {
      expect(err).to.be.not.ok;
      expect(output.stdout.trim()).to.equal("hello, world");
      done();
    });
  });

  it("should execute command @Promise", function() {
    return xsh.exec("echo hello, world").then(output => {
      expect(output.stdout.trim()).to.equal("hello, world");
    });
  });

  it("should failed for empty arguments", function() {
    expect(() => xsh.exec()).to.throw(Error);
  });

  it("should failed for no command", function() {
    expect(() => xsh.exec(() => undefined)).to.throw(Error);
  });

  it("should exec command split in array", function(done) {
    xsh.exec(["echo", "hello,", "world"], function(err, output) {
      expect(err).to.be.not.ok;
      expect(output.stdout.trim()).to.equal("hello, world");
      done();
    });
  });

  it("should exec command split in multiple arrays", function(done) {
    xsh.exec(["echo", "hello, world"], ["my", "name", "is", "test"], function(err, output) {
      expect(err).to.be.not.ok;
      expect(output.stdout.trim()).to.equal("hello, world my name is test");
      done();
    });
  });

  it("should exec command split in arrays and strings", function(done) {
    xsh.exec(
      ["echo", "hello, world"],
      ["my", "name"],
      "is",
      "test",
      ["foo", "bar"],
      "more",
      "text",
      function(err, output) {
        expect(err).to.be.not.ok;
        expect(output.stdout).to.equal("hello, world my name is test foo bar more text\n");
        done();
      }
    );
  });

  it("should exec with user env", function(done) {
    process.env.FOO = "bar";
    xsh.exec(
      {
        env: {
          hello: "test",
          PATH: process.env.PATH
        }
      },
      "echo FOO=$FOO hello=$hello",
      function(err, output) {
        expect(err).to.be.not.ok;
        expect(output.stdout).includes("FOO= hello=test");
        delete process.env.FOO;
        done();
      }
    );
  });

  it("should failed if a command fragment is not array or string", function() {
    expect(() => xsh.exec("test", ["1", "2"], true)).to.throw(Error);
  });
});
