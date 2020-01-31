const request = require("supertest");
const app = require("../server/server");
const { RouteNames } = require("../constants/constants");
var expect = require('chai').expect;
const config = require("../config/constants");


describe('Courses Tests', () => {

    it("Create Course while not autorized", (done) => {
        request(app)
            .post(RouteNames.AddCourse)
            .send(config.Course)
            .set("Accept", "application/json")
            .end(function(err, response) {
                if (err) {
                    return err;
                }
                //console.log(response.body);
                expect(response.statusCode).to.equal(401);
                done();
            });
    });

    it("Create Course while autorized", (done) => {
        request(app)
            .post(RouteNames.AddCourse)
            .send(config.Course)
            .set("Accept", "application/json")
            .set('authorization', config.AuthToken)
            .end(function(err, response) {
                if (err) {
                    return err;
                }
                //console.log(response.body);
                expect(response.statusCode).to.equal(202);
                done();
            });
    });
});