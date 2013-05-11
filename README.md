# grunt-init-yui

> Create a YUI module with [grunt-init][], including YUITest unit tests and Istanbul code coverage.

[grunt-init]: http://gruntjs.com/project-scaffolding

## Installation

If you haven't already done so, install [grunt-init][].
Due to a bug in the core repo, we're using a fixed fork for the time being.

```bash
npm -g install git://github.com/neekey/grunt-init.git
```

Once grunt-init is installed, place this template in your `~/.grunt-init/` directory. It's recommended that you use git to clone this template into that directory, as follows:

```bash
git clone git@github.com:gruntjs/grunt-init-yui.git ~/.grunt-init/yui
```

_(Windows users, see [the documentation][grunt-init] for the correct destination directory path)_

## Usage

At the command-line, cd into an empty directory, run this command and follow the prompts.

```
grunt-init yui
```

If a YUI-based project does not exist yet, it will create one.

_Note that this template will generate files in the current directory, so be sure to change to a new directory first if you don't want to overwrite existing files._
