const chai = require("chai");
const chaiHttp = require("chai-http");

const should = chai.should();

const { app, runServer, closeServer } = require("../server");
const { DATABASE_URL } = require("../config");

chai.use(chaiHttp);

describe("Testing server", function() {
  before(function() {
    return runServer(DATABASE_URL);
  });

  after(function() {
    return closeServer();
  });

  it("should return 200 status code on GET to root url", function() {
    return chai
      .request(app)
      .get("/")
      .then(function(res) {
        res.should.have.status(200);
      });
  });
});
