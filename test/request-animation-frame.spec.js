class Delay {
  constructor() {
    this.message = "Not granted";
  }

  request() {
    requestAnimationFrame(() => this.message = "Request granted");
  }
}

describe("Requesting animation frames", function() {
  let message;
  requestAnimationFrame(() => message = "Request granted");

  it("passes, because request is immediately granted", function() {
    expect(message).to.equal("Request granted");
  });

  it("fails, because request isn't granted immediately", function() {
    const delay = new Delay();
    expect(delay.message).to.equal("Not granted");
    delay.request();
    expect(delay.message).to.equal("Request granted");
  });

  it("passes, because requests are granted about 60 times per second", function(done) {
    const delay = new Delay();
    expect(delay.message).to.equal("Not granted");
    delay.request();
    setTimeout(() => {
      expect(delay.message).to.equal("Request granted");
      done();
    }, 10);
  });
});
