#!/usr/bin/env node
var nopt = require('nopt');
var path = require('path');
var spawn = require('child_process').spawn;

var knownOpts = {
    "gallery": Boolean,
    "project": Boolean,
    "version": Boolean,
    "help": Boolean
};
var shortHands = {
    "v": ["--version"],
    "h": ["--help"]
};
var parsed = nopt(knownOpts, shortHands);

if (parsed.version) {
    console.log('v%s', require('../package.json').version);
    process.exit(0);
} else if (parsed.help) {
    var usage = [];

    usage.push("Usage: grunt-init-yui <options>");
    usage.push("");
    usage.push("Options:");
    usage.push("  --project       Only initialize a project, not a module.");
    usage.push("  --gallery       The module initialized will live in the gallery.");
    usage.push("  --no-color      Disables color output.");
    usage.push("  --no-write      Disables writing files (dry run).");
    usage.push("  -f, --force     Ignore warnings. Caveat emptor.");
    usage.push("  -v, --version   Print version and exit.");
    usage.push("");
    usage.push("grunt-init-yui v" + require('../package.json').version);

    console.log(usage.join('\n'));
    process.exit(0);
}

var TEMPLATE   = path.resolve(__dirname, '..'); // grunt-init <path/to/template>
var GRUNT_INIT = path.join(TEMPLATE, 'node_modules/grunt-init/bin/grunt-init');

var args = [TEMPLATE].concat(parsed.argv.cooked);

var child = spawn(GRUNT_INIT, args, {
    stdio: 'inherit'
});

child.on('close', function (code) {
    process.exit(code);
});
