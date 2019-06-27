
const assert = require("assert");
const mocha = require("mocha");     
const chai = require("chai");   
const chaiHttp = require("chai-http");

const app = require("../app")
const expect = chai.expect;
const should = chai.should(); //использую это постоянно
const faker = require("faker")

chai.use(chaiHttp);

const Tests = {
    randomUser: {
        email: faker.internet.email(),
        password: faker.internet.password()
    },
    GETmethods: {
        pages: ["/", "/register", 
        "/sign_In", "/home" ], 
        articlesUrl: "/post/",


    },
    POSTmethods: {
        register: "/register",
        sign_In: "/sign_In",
        createArticle: "/createArticle"
    },

}

const positive = require("./positiveTests")


positive.startPositiveTests(Tests)

