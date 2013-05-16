/*global describe, before, after, it */

// built-ins
var fs = require('fs');
var path = require('path');
var spawn = require('child_process').spawn;

// devDependencies
var glob = require('glob');
var mkdirp = require('mkdirp');
var rimraf = require('rimraf');

// file to test
var template = require('../template');

// shared variables
var OUTPUT_DIR = __dirname + '/template-output';
var TEMPLATE   = path.resolve(__dirname, '..'); // grunt-init <path/to/template>
var GRUNT_INIT = path.join(TEMPLATE, 'node_modules/grunt-init/bin/grunt-init');

var EXPECTED_FILES = [
    "BUILD.md",
    "Gruntfile.js",
    "LICENSE-MIT",
    "README.md",
    "package.json",
    "src",
    "src/template-output",
    "src/template-output/HISTORY.md",
    "src/template-output/README.md",
    "src/template-output/build.json",
    "src/template-output/docs",
    "src/template-output/docs/component.json",
    "src/template-output/docs/index.mustache",
    "src/template-output/js",
    "src/template-output/js/template-output.js",
    "src/template-output/meta",
    "src/template-output/meta/template-output.json",
    "src/template-output/tests",
    "src/template-output/tests/unit",
    "src/template-output/tests/unit/assets",
    "src/template-output/tests/unit/assets/template-output-test.js",
    "src/template-output/tests/unit/index.html"
];

describe("templating", function () {
    this.slow('5s');

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
                filesCreated().should.eql(EXPECTED_FILES);
                done();
            });
        });

        it("should not overwrite existing project");

        it("should not overwrite existing module");
    });

    describe("project only", function () {
        before(function (done) {
            rimraf(OUTPUT_DIR, function () {
                mkdirp(OUTPUT_DIR, done);
            });
        });

        it("should not output module content", function (done) {
            var child = spawn(GRUNT_INIT, [TEMPLATE, '--project'], {
                cwd: OUTPUT_DIR,
                stdio: 'pipe'
            });

            child.stdout.setEncoding('utf8');
            child.stdout.on('data', defaultPrompts(child));

            child.on('close', function (code) {
                filesCreated().should.eql(EXPECTED_FILES.slice(0, 5));
                done();
            });
        });
    });

    function filesCreated(pattern) {
        return glob.sync(pattern || '**/*', { cwd: OUTPUT_DIR });
    }

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
