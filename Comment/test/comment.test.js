const request = require("supertest");
const app = require("../../server/server");
const { RouteNames } = require("../../constants/constants");
var expect = require('chai').expect;
const config = require("../../config/constants");

describe('Comment Tests', () => {

    it("Create comment while not autorized", (done) => {
        request(app)
            .post(RouteNames.AddComment)
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

    it("Create comment while autorized", (done) => {
        request(app)
            .post(RouteNames.AddComment)
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

    it("Deleting Comment while not autorized", (done) => {
        request(app)
            .delete(RouteNames.AddComment)
            .send(config.CrsDel)
            .set("Accept", "application/json")
            .end(function(err, response) {
                if (err) {
                    return err;
                };
                expect(response.statusCode).to.equal(401);
                done();
            });
    });

    it("Deleting Course while being autorized", (done) => {
        request(app)
            .delete(RouteNames.AddComment)
            .send(config.CrsDel)
            .set("Accept", "application/json")
            .set('authorization', config.AuthToken)
            .end(function(err, response) {
                if (err) {
                    return err;
                };
                expect(response.statusCode).to.equal(202);
                done();
            });
    });
    it("Add comment for non existing course and being unauthorized",(done)=>{});
    it("Add comment for non existing course and being authorized",(done)=>{});
});