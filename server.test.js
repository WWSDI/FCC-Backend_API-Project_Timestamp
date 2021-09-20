const request = require("supertest");
const app = require("./server");

describe("valid input to GET /api/:date?", () => {
  test("", (done) => {
    request(app)
      .get("/api/2016-12-25")
      .expect(200)
      .expect((res) => {
        expect(res.body.unix).toBe(1482624000000);
      })
      .expect(200, done);
    // .expect(done)
  });
});
