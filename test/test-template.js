/*global describe, before, after, it */

// built-ins
var fs = require('fs');
var path = require('path');
var spawn = require('child_process').spawn;

// devDependencies
var mkdirp = require('mkdirp');
var rimraf = require('rimraf');

// file to test
var template = require('../template');

// shared variables
var OUTPUT_DIR = __dirname + '/template-output';
var TEMPLATE   = path.resolve(__dirname, '..'); // grunt-init <path/to/template>
var GRUNT_INIT = path.join(TEMPLATE, 'node_modules/grunt-init/bin/grunt-init');

describe("templating", function () {
    this.timeout(0);

    before(function (done) {
        mkdirp(OUTPUT_DIR, done);
    });

    after(function (done) {
        rimraf(OUTPUT_DIR, done);
    });

    describe("module", function () {
        it("should create project if missing", function (done) {
            var child = spawn(GRUNT_INIT, [TEMPLATE], {
                cwd: OUTPUT_DIR,
                stdio: 'pipe'
            });

            child.stdout.setEncoding('utf8');
            child.stdout.on('data', defaultPrompts(child));

            child.on('close', function (code) {
                done();
            });
        });

        it("should not overwrite existing project");

        it("should not overwrite existing module");
    });

    describe("project only", function () {
        it("should not output module content");
    });

    function defaultPrompts(child) {
        return function (data) {
            // start of a prompt "[?]"
            if (data.indexOf('[') === 0) {
                // send newline to accept defaults
                process.nextTick(function () {
                    child.stdin.write('\n');
                });
            }
        };
    }
});
