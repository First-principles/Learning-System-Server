const request = require("supertest");
const app = require("../../server/server");
const Route = require("../constants");
var expect = require('chai').expect;
const config = require("../../config/constants");

describe('Comment Tests on Courses', () => {

    it("Create comment while unautorized", (done) => {
        request(app)
            .post(Route.AddComment2Course)
            .send(config.GoodCourseComment)
            .set("Accept", "application/json")
            .end(function(err, response) {
                if (err) {
                    return err;
                }
                expect(response.statusCode).to.equal(401);
                done();
            });
    });

    it("Add comment for non existing lesson and being unauthorized",(done)=>{
        request(app)
            .post(Route.AddComment2Course)
            .send(config.BadCourseComment)
            .set("Content-Type", "application/json")
            .end(function(err, response) {
                if (err) {
                    return err;
                }
                expect(response.statusCode).to.equal(401);
                done();
            });
    });
    it("Add comment for non existing lesson and being authorized",(done)=>{
        request(app)
            .post(Route.AddComment2Course)
            .send(config.BadCourseComment)
            .set("Content-Type", "application/json")
            .set('authorization', config.AuthToken)
            .end(function(err, response) {
                if (err) {
                    return err;
                }
                expect(response.statusCode).to.equal(422);
                done();
            });
    });

});