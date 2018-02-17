const expect = require("chai").expect;

let message = "Unresolved";
Promise.resolve("Resolved").then(r => message = r);

class Delay {
  constructor() {
    this.message = "Unresolved";
  }

  generateMessage() {
    Promise.resolve("Resolved").then(r => this.message = r);
  }
}

describe("Side effects of promises", function() {
  it("passes, because promise has already been resolved", function() {
    expect(message).to.equal("Resolved");
  });

  it("fails, because promise doesn't resolve immediately", function() {
    const delay = new Delay();
    expect(delay.message).to.equal("Unresolved");
    delay.generateMessage();
    expect(delay.message).to.eql("Resolved");
  });

  it("passes, because promise does resolve eventually", function(done) {
    const delay = new Delay();
    expect(delay.message).to.equal("Unresolved");
    delay.generateMessage();
    setTimeout(() => {
      expect(delay.message).to.eql("Resolved");
      done();
    });
  });

});
