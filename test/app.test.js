const chai = require("chai");
const chaiHttp = require("chai-http");
const app = require("../app");

chai.use(chaiHttp);

describe("Testing server response", () => {
  it("Test that the app's response to a GET request in the root route is 200", (done) => {
    chai
      .request(app)
      .get("/")
      .end((err, res) => {
        if (err) {
          console.error(err);
        }
        chai.expect(res).to.have.status(200);
        done();
      });
  });
});
