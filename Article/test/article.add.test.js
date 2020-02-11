const request = require("supertest");
const app = require("../../server/server");
const Route = require("../constants");
var expect = require('chai').expect;
const config = require("../../config/constants");

describe('Adding Articles Tests', () => {

    it("Create Articles while not autorized", (done) => {
        request(app)
            .post(Route.AddArticle)
            .send(config.GoodArticle)
            .set("Content-Type", "application/json")
            .end(function(err, response) {
                if (err) {
                    return err;
                }
                //console.log(response.body);
                expect(response.statusCode).to.equal(401);
                done();
            });
    });

    it("Create Lesson while autorized", (done) => {
        request(app)
            .post(Route.AddArticle)
            .send(config.GoodArticle)
            .set("Content-Type", "application/json")
            .set("Accept", "application/json")
            .set('authorization', config.AuthToken)
            .end(function(err, response) {
                if (err) {
                    return err;
                }
                console.log(response.body);
                expect(response.statusCode).to.equal(202);
                done();
            });
    });

    it("Create article while autorized but user doesn't exists", (done) => {
        request(app)
            .post(Route.AddArticle)
            .send(config.BadArticle)
            .set("Content-Type", "application/json")
            .set("Accept", "application/json")
            .set('authorization', config.AuthToken)
            .end(function(err, response) {
                if (err) {
                    return err;
                }
                console.log(response.body);
                expect(response.statusCode).to.equal(422);
                done();
            });
    });


});