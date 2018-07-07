# generator-scoresync [![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Dependency Status][daviddm-image]][daviddm-url]
> Creates a simple gulp file to enable auto sync for assets on score scaffolded projects.

## Installation

First, to install [Yeoman](http://yeoman.io) and generator-scoresync using [npm](https://www.npmjs.com/) (we assume you have pre-installed [node.js](https://nodejs.org/)).


Install Yeoman (If you dont have it installed)
```bash
npm install -g yo
```

Install GULP Client (If you dont have it installed)
```bash
npm install -g gulp-cli
```


Install this Generator
```bash
npm install -g https://github.com/robertobarbedo/generator-scoresync.git
```


Then generate in your  project:

**1. Execute from the folder where your solution (.sln) file is located**

**2. Run the command prompt as Administrator**

Install GULP local (If you dont have gulp global installed - not gulp-cli)
```bash
npm install gulp
```

Install the generator in your project (creates two files gulpfile.js and package.json)
```bash
yo scoresync
```

## Visual Studio

![alt text](https://github.com/robertobarbedo/generator-scoresync/blob/master/scoresync.gif)

On Visual Studio you can start-up the "watch" task from the "Task Runner Explorer"

Go to Menu View > Other Windows > Task Runner Explorer

It the tasks don`t show up, verify in Menu: Tools > Options > Project and Solutions > External Web Tools
Make sure the order of the locations is $(PATH) then .\node_modules\.bin, and then others.



## License

Apache-2.0 © [Roberto Barbedo]()


[npm-image]: https://badge.fury.io/js/generator-scoresync.svg
[npm-url]: https://npmjs.org/package/generator-scoresync
[travis-image]: https://travis-ci.org/robertobarbedo@gmail.com/generator-scoresync.svg?branch=master
[travis-url]: https://travis-ci.org/robertobarbedo@gmail.com/generator-scoresync
[daviddm-image]: https://david-dm.org/robertobarbedo@gmail.com/generator-scoresync.svg?theme=shields.io
[daviddm-url]: https://david-dm.org/robertobarbedo@gmail.com/generator-scoresync

end