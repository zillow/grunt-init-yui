/*global describe, before, after, it */

// built-ins
var fs = require('fs');
var path = require('path');

// devDependencies
var mkdirp = require('mkdirp');
var rimraf = require('rimraf');

// file to test
var template = require('../template');

// shared variables
var OUTPUT_DIR = __dirname + '/template-output';

describe("template", function () {
    before(function (done) {
        mkdirp(OUTPUT_DIR, done);
    });

    after(function (done) {
        rimraf(OUTPUT_DIR, done);
    });

    it("TODO");
});
