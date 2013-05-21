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
            child.stdout.on('data', answerPrompts(child));

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
            child.stdout.on('data', answerPrompts(child));

            child.on('close', function (code) {
                filesCreated().should.eql(EXPECTED_FILES.slice(0, 5));
                done();
            });
        });

        describe("with unversioned build directory", function () {
            before(function (done) {
                var child = spawn(GRUNT_INIT, [TEMPLATE, '--project', '--force'], {
                    cwd: OUTPUT_DIR,
                    stdio: 'pipe'
                });

                child.stdout.setEncoding('utf8');
                child.stdout.on('data', answerPrompts(child, {
                    'Version build directory?': 'n'
                }));

                child.on('close', function (code) {
                    done();
                });
            });

            it("should include build/ in .gitignore", function () {
                var ignores = fs.readFileSync(path.join(OUTPUT_DIR, '.gitignore'), 'utf8');

                ignores.should.equal([
                    'node_modules/',
                    'build/',
                    'coverage/',
                    'release/',
                    ''
                ].join('\n'));
            });

            it("should include grunt-contrib-clean in devDependencies", function () {
                var packageJSON = require(path.join(OUTPUT_DIR, 'package.json'));

                packageJSON.should.have.property('devDependencies');
                packageJSON.devDependencies.should.have.property('grunt-contrib-clean');
            });

            it("should load npm tasks for grunt-contrib-clean", function () {
                var gruntfile = fs.readFileSync(path.join(OUTPUT_DIR, 'Gruntfile.js'), 'utf8');

                gruntfile.indexOf('grunt-contrib-clean').should.be.above(0);
            });
        });
    });
});

function filesCreated(pattern) {
    return glob.sync(pattern || '**/*', { cwd: OUTPUT_DIR });
}

/**
Returns the "Project name" part of a "[?] Project name (foo)"
shell-escaped color prompt string.

@method getMessage
@param {String} prompt
@return {String}
**/
function getMessage(prompt) {
    var mStarts = prompt.indexOf('\u001b[90m') + 5;
    var mFinish = prompt.indexOf('\u001b[39m', mStarts);
    return prompt.substring(mStarts, mFinish);
}

/**
Answer the prompts via writing to a child's stdin.

If an answers object is provided, keys matching the
prompt's "message" property will answer thusly.

When no answer matches (or none is provided), the
default is accepted.

@method answerPrompts
@param {ChildProcess} child
@param {Object} [answers]
**/
function answerPrompts(child, answers) {
    answers = answers || {};
    return function (data) {
        var message,
            prompt = data.indexOf('[\u001b[32m?') === 0;
        // start of a prompt "[?]"
        if (prompt) {
            // send matching answer, or newline to accept default
            process.nextTick(function () {
                child.stdin.write((answers[getMessage(data)] || '') + '\n');
            });
        }
    };
}
