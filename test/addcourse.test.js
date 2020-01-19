const request = require("supertest");
const app = require('../server/server');
var { RouteNames } = require("../constants/constants");
var expect = require('chai').expect;

const ValidUser = {
    username: "hi",
    email: "hi@gmail.com",
    password: "hello"
};

const NotValidUser = {
    username: "hi",
    email: "hi@gmail.com",
    password: "hello"
};

//NOTE specs with no expectations within just pass.
describe('Registeration Tests', () => {

    //SECTION Fine Registeration
    it("Fine Registeration ", (done) => {
        request(App)
            .post(RouteNames.AddUser)
            .send(ValidUser)
            .end(function(err, response) {
                if (err) {
                    return err;
                }

                expect(response.statusCode).to.equal(200);
                done();
            });
    });

    //SECTION Bad Registeration
    it(TestNames.Regiseration_Case2, function(done) {
        request(App)
            .post(RouteNames.AddUser)
            .send({ NotValidUser })
            .end(function(err, response) {
                if (err) {
                    return err;
                }
                expect(response.statusCode).to.equal(422);
                done();
            });
    });
});