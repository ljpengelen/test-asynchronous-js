import chaiAsPromised from "chai-as-promised";

chai.use(chaiAsPromised);

describe("Resolved promise", function() {
  const p = Promise.resolve("Done before you know it");

  it("passes, but not for the right reasons", function() {
    p.then(r => {
      expect(r).to.eql("This is not what I want");
    });
  });

  it("passes for the right reasons", function(done) {
    p.then(r => {
      expect(r).to.eql("Done before you know it");
      done();
    });
  });

  it("also passes for the right reasons", function() {
    return p.then(r => {
      expect(r).to.eql("Done before you know it");
    });
  });

  it("passes for the right reasons too", function() {
    expect(p).to.eventually.become("Done before you know it");
  });
});
