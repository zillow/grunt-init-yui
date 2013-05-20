# grunt-init-yui

> Create a YUI module with [grunt-init][], including YUITest unit tests and Istanbul code coverage.

[grunt-init]: http://gruntjs.com/project-scaffolding

## Installation

Install `grunt-init-yui` globally via `npm`.

```bash
npm -g install grunt-init-yui
```

## Usage

At the command-line, cd into an empty directory, run this command and follow the prompts.

```
grunt-init-yui
```

If a YUI-based project does not exist yet, it will create one.
An initialized module is placed under `src/{moduleName}` in the current directory.

_Note that this template will generate files in the current directory,so be sure to change to a new directory first if you don't want to overwrite existing files._

### Options

```text
  --project       Only initialize a project, not a module.
  --gallery       The module initialized will live in the gallery.

  --no-color      Disables color output.
  --no-write      Disables writing files (dry run).
  -f, --force     Ignore warnings. Caveat emptor.
  -v, --version   Print version and exit.
```

### Directory Structure

When initializing a module or project, it is helpful (but by no means required) to already have a Git repo initialized:

```bash
mkdir project
cd project
git init .
```



