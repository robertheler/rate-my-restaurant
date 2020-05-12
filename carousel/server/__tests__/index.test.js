const supertest = require('supertest');
const database = require('../../database/index.js');
// we also need our app for the correct routes!
const app = require("../../server/index.js");

// we will use supertest to test HTTP requests/responses
const request = supertest(app);

describe("GET /images ", () => {
    afterAll(async (done) => {
        database.end();
        done();
    });
    it("It should respond with a status code of 200 on success", async (done) => {
      const response = await request.get(`/images/`);

      expect(response.statusCode).toEqual(200);
      done();
    });
    it("It should respond with the number of images in the database", async (done) => {
      const response = await request.get(`/images/`);

      expect(response.body.length).toEqual(12);
      done();
    });
    it("It should have imageTitle and imageUrl in the database", async (done) => {
      const response = await request.get(`/images/`);
  
      expect(response.body[0]).toHaveProperty("imageTitle");
      expect(response.body[0]).toHaveProperty("itemImageUrl");
      done();
    });
    it("It should respond with a 404 statuscode when an invalid path is used", async (done) => {
      const response = await request.get(`/images/null`);
    
      expect(response.statusCode).toEqual(404);
      done();
    });
  });



