'use strict'

var app = require('../app')
var chai = require('chai')
var request = require('supertest')

var expect = chai.expect

describe('Integration Tests', function () {
    describe('# GET /', function () {
        it('should get the homepage', function (done) {
            request(app).get('/')
                .end(function (err, res) {
                    expect(res.statusCode).to.equal(200)
                    done()
                })
        })
    })
    describe('# GET /posts', function () {
        it('should get the posts page', function (done) {
            request(app).get('/posts')
                .end(function (err, res) {
                    expect(res.statusCode).to.equal(200)
                    done()
                })
        })
    })
    describe('# GET /about', function () {
        it('should get the about page', function (done) {
            request(app).get('/about')
                .end(function (err, res) {
                    expect(res.statusCode).to.equal(200)
                    done()
                })
        })
    })
    describe('# GET /uncopyright', function () {
        it('should get the uncopyright page', function (done) {
            request(app).get('/uncopyright')
                .end(function (err, res) {
                    expect(res.statusCode).to.equal(200)
                    done()
                })
        })
    })
    describe('# GET /core.css', function () {
        it('should get the css file', function (done) {
            request(app).get('/core.css')
                .end(function (err, res) {
                    expect(res.statusCode).to.equal(200)
                    done()
                })
        })
    })
    describe('# GET /posts/something-decent', function () {
        it('should get the "something-decent" post page', function (done) {
            request(app).get('/posts/something-decent')
                .end(function (err, res) {
                    expect(res.statusCode).to.equal(200)
                    done()
                })
        })
    })
    describe('# GET /posts/something-not-here-xxxxx', function () {
        it('should get the 404 page via 302 redirect', function (done) {
            request(app).get('/posts/something-not-here-xxxxx')
                .end(function (err, res) {
                    expect(res.statusCode).to.equal(302)
                    done()
                })
        })
    })
    describe('# GET /404', function () {
        it('should get the 404 page', function (done) {
            request(app).get('/404')
                .end(function (err, res) {
                    expect(res.statusCode).to.equal(404)
                    done()
                })
        })
    })
})