# generator-scoresync [![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Dependency Status][daviddm-image]][daviddm-url]
> Creates a simple gulp file to enable auto sync for assets on score scaffolded projects.

## Installation

First, to install [Yeoman](http://yeoman.io) and generator-scoresync using [npm](https://www.npmjs.com/) (we assume you have pre-installed [node.js](https://nodejs.org/)).

```bash
npm install -g yo
npm install -g https://github.com/robertobarbedo/generator-scoresync.git
```

Then generate your new project **from the folder where your solution (.sln) file is located**:

```bash
yo scoresync
```

## Visual Studio

On Visual Studio you can start-up the "watch" task from the "Task Runner Explorer"

Go to Menu View > Other Windows > Task Runner Explorer

It the tasks don`t show up, verify in Menu: Tools > Options > Project and Solutions > External Web Tools
Make sure the order of the locations is $(PATH) then .\node_modules\.bin, and then others.

## Getting To Know Yeoman

 * Yeoman has a heart of gold.
 * Yeoman is a person with feelings and opinions, but is very easy to work with.
 * Yeoman can be too opinionated at times but is easily convinced not to be.
 * Feel free to [learn more about Yeoman](http://yeoman.io/).

## License

Apache-2.0 © [Roberto Barbedo]()


[npm-image]: https://badge.fury.io/js/generator-scoresync.svg
[npm-url]: https://npmjs.org/package/generator-scoresync
[travis-image]: https://travis-ci.org/robertobarbedo@gmail.com/generator-scoresync.svg?branch=master
[travis-url]: https://travis-ci.org/robertobarbedo@gmail.com/generator-scoresync
[daviddm-image]: https://david-dm.org/robertobarbedo@gmail.com/generator-scoresync.svg?theme=shields.io
[daviddm-url]: https://david-dm.org/robertobarbedo@gmail.com/generator-scoresync
