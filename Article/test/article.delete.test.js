const mongoose = require("mongoose");
const request = require("supertest");
const app = require("../../server/server");
const Route = require("../constants");
var expect = require('chai').expect;
const config = require("../../config/constants");

//FIXME 
// const User = mongoose.model("User");
// const Article = mongoose.model("Article");
// const GoodRequest = ()=>{
//     const user = User.findOne();
//     const article = Article.findOne();
// }

describe('Deleting Articles Tests', () => {

    it("Delete Articles while not autorized", (done) => {
        request(app)
            .delete(Route.AddArticle)
            .send(config.ExistingArticle)
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

    it("Delte Lesson while autorized", (done) => {
        request(app)
            .delete(Route.AddArticle)
            .send(config.ExistingArticle)
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
});