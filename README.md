# grunt-init-yui [![Build Status](https://travis-ci.org/evocateur/grunt-init-yui.png)](https://travis-ci.org/evocateur/grunt-init-yui)

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

#### Project Root

```text
project/
 ├── BUILD.md
 ├── Gruntfile.js
 ├── LICENSE-MIT
 ├── README.md
 └── package.json
```

#### JS Module

This is the default module type, and is by far the most common across the core library.

```text
 project/
 └─┬ src/
   └─┬ js-module/
     ├── HISTORY.md
     ├── README.md
     ├── build.json
     ├─┬ docs/
     │ ├── component.json
     │ └── index.mustache
     ├─┬ js/
     │ └── js-module.js
     ├─┬ meta/
     │ └── js-module.json
     └─┬ tests/
       └─┬ unit/
         ├── index.html
         └─┬ assets/
           └── js-module-test.js
```

#### CSS Module

A CSS module contains a `css` directory instead of `js`, and is otherwise remarkably similar to a JS module.

```text
 project/
 └─┬ src/
   └─┬ css-module/
     ├── HISTORY.md
     ├── README.md
     ├── build.json
     ├─┬ css/
     │ └── css-module.css
     ├─┬ docs/
     │ ├── component.json
     │ └── index.mustache
     ├─┬ meta/
     │ └── css-module.json
     └─┬ tests/
       └─┬ unit/
         └── index.html
```

#### Widget Module

The output of the `widget` type is identical to `js`, with the addition of an `assets` folder containing core and skin CSS files. The metadata is also modified to require `widget` and sets the `skinnable` property to `true`.

```text
 project/
 └─┬ src/
   └─┬ widget-module/
     ├── HISTORY.md
     ├── README.md
     ├── build.json
     ├─┬ assets/
     │ └─┬ widget-module/
     │   ├── widget-module-core.css
     │   └─┬ skins/
     │     ├─┬ night/
     │     │ └── widget-module-skin.css
     │     └─┬ sam/
     │       └── widget-module-skin.css
     ├─┬ docs/
     │ ├── component.json
     │ └── index.mustache
     ├─┬ js/
     │ └── widget-module.js
     ├─┬ meta/
     │ └── widget-module.json
     └─┬ tests/
       └─┬ unit/
         ├── index.html
         └─┬ assets/
           └── widget-module-test.js
```
