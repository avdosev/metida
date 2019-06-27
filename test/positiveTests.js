
const mocha = require("mocha");     
const chai = require("chai");   
const chaiHttp = require("chai-http");

const app = require("../app")
const expect = chai.expect;
const should = chai.should(); //использую это постоянно


chai.use(chaiHttp);



function startPositiveTests(Tests) {
    GETmethods(Tests.GETmethods.pages)
    testUser(Tests.POSTmethods.register, Tests.POSTmethods.sign_In, Tests.randomUser )

}


function GETmethods(pages) {
    mocha.describe('GET', () => {
        mocha.describe('Pages' , () => {
            for (let i = 0; i < pages.length; i++) {
                mocha.it(pages[i], (done) => { 
                        chai.request(app)
                            .get(pages[i])
                            .end((err, res) => {
                                expect(err).to.be.null;
                                res.should.have.status(200);
                                done();
                            });
                });
            }
        })

        mocha.describe('Articles', () => {

        })
    });
}


function testUser(registerUrl, signInUrl, randomUser) {

    mocha.describe('User API', () => {
        register()
        logout()
        sign_In()

        function register() {
            mocha.it(registerUrl, (done) => {
                chai.request(app)
                    .post(registerUrl)
                    .send(randomUser)
                    .end( (err, res) => {
                        expect(err).to.be.null;
                        expect(res).to.have.status(200);
                        done()
                    })
                })
        }

        function sign_In() {
            mocha.it(signInUrl, (done) => {
                chai.request(app)
                    .post(signInUrl)
                    .send(randomUser)
                    .end( (err, res) => {
                        expect(err).to.be.null;
                        expect(res).to.have.status(200);
                        done()
                    })
            })
        }

        function logout() {
            mocha.it('logout', (done) => {
                chai.request(app)
                    .get('/logout')
                    .end( (err, res) => {
                        expect(err).to.be.null;
                        expect(res).to.have.status(200);
                        done()
                    })
            })
        }
    })   
}

module.exports = {
    startPositiveTests

}