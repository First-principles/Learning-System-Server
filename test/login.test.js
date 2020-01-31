const request = require("supertest");
const app = require("../server/server");
const { RouteNames } = require("../constants/constants");
var expect = require('chai').expect;
const config = require("../config/constants");
const fs=require('fs');
const path=require('path');


const constants_path= path.join(__dirname,'../config/constants.json')
var constants=fs.readFileSync(constants_path).toString();
constants=JSON.parse(constants)


describe("Login Tests", () => {

    //SECTION Fine login
    it("Fine Login", function(done) {
        request(app)
            .post(RouteNames.Login)
            .send(config.ValidLoginUser)
            //.set("Accept", "application/json")
            .end(function(err, response) {
                if (err) {
                    return err;
                }
                //console.log(response.body);
                constants.AuthToken='Token '+response.body.token;
                const constants_JSON=JSON.stringify(constants)
                fs.writeFileSync(constants_path,constants_JSON);
                expect(response.statusCode).to.equal(202);
                done();
            });
    });
    //SECTION login with not valid user 
    it("Bad Login", function(done) {
        request(app)
            .post(RouteNames.Login)
            .send(config.BadLoginUser)
            .set("Accept", "application/json")
            .end(function(err, response) {
                if (err) {
                    return err;
                }
                //console.log("Response Body:", response);
                expect(response.statusCode).to.equal(422);
                done();
            });
    });

});