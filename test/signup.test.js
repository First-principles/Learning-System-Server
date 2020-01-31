const request = require("supertest");
const app = require("../server/server");
const { RouteNames } = require("../constants/constants");
var expect = require('chai').expect;
const config = require("../config/constants");
const fs=require('fs');
const path=require('path');

//NOTE specs with no expectations within just pass.
const constants_path= path.join(__dirname,'../config/constants.json')
var constants=fs.readFileSync(constants_path).toString();
constants=JSON.parse(constants)


describe('Registeration Tests', () => {

    //SECTION Fine Registeration
    it("FINE REGISTERATION",  (done) => {
         request(app)
            .post(RouteNames.AddUser)
            .send(config.ValidUser)
            .end(function(err, response) {
                if (err) {
                    return err;
                }
                constants.AuthToken='Token '+response.body.token;
                const constants_JSON=JSON.stringify(constants)
                fs.writeFileSync(constants_path,constants_JSON);

                expect(response.statusCode).to.equal(202);
                done();
            });
    });

    //SECTION Bad Registeration
    it("Bad Registeration",  function(done) {
         request(app)
            .post(RouteNames.AddUser)
            .send(config.NotValidUser)
            .end(function(err, response) {
                if (err) {
                    return err;
                }
                expect(response.statusCode).to.equal(422);
                done();
            });
    })
    it("Register already registered",  function(done) {
       request(app)
            .post(RouteNames.AddUser)
            .send(config.ValidLoginUser)
            .end(function(err, response) {
                if (err) {
                    return err;
                }
                expect(response.statusCode).to.equal(422);
                done();
            });


    });
    it("Registeration with already exists", function(done) {
        request(app)
            .post(RouteNames.AddUser)
            .send(config.ValidLoginUser)
            .end(function(err, response) {
                if (err) {
                    return err;
                };
                expect(response.statusCode).to.equal(422);
                done();
            });
    });
});