# EAN Stack

EAN is a boilerplate that provides a nice starting point for [Node.js](http://www.nodejs.org/), [Express](http://expressjs.com/), and [AngularJS](http://angularjs.org/) based applications. It is designed to give you quick and organized way to start developing of MEAN based web apps with useful modules like mongoose and passport pre-bundled and configured. We mainly try to take care of the connection points between existing popular frameworks and solve common integration problems.
## Philosophy
Opinionated stack perfect for building large and small angular apps

### Target browsers
* this stack targets anything newer than IE9, inluding IE9. If you need to run on IE8 or older, this boilerplate is not for you.
* stack assumes, that the app will be used on mobiles and tablets and includes
angular-touch and angular-gestures to make mobile experience that much better

## Prerequisites
* Node.js - Download and Install [Node.js](http://www.nodejs.org/download/). You can also follow [this gist](https://gist.github.com/isaacs/579814) for a quick and easy way to install Node.js
* NPM - Node.js package manager, should be installed when you install node.js.

### Global packages Prerequisites

* Bower - Web package manager, installing [Bower](http://bower.io/) is simple when you have npm:

```
$ npm install -g bower
```
* Grunt - The JavaScript Task Runner, Download and Install [Grunt](http://gruntjs.com) also through npm:

```
$ npm install -g grunt-cli
```

## Additional Packages
* Express - Defined as npm module in the [package.json](package.json) file.
* AngularJS - Defined as bower module in the [bower.json](bower.json) file.
* Twitter Bootstrap - Included in the project, because we want to be able to overwrite it easily.
* UI Bootstrap - Defined as bower module in the [bower.json](bower.json) file.

## Build enviroment
There are two preset build environments: "dev", "production"
Which one is used for build determines the "env" field in package.json.
* "dev" should be used for development- it won't minify and won't strip livereload script
* "production" should be used for production-everything get's minified, livereload is removed from index.html

## Quick Install
  The quickest way to get started with EAN is to clone the project and then:

  1.Install dependencies:

    $ npm install

  2. Use [Grunt](https://github.com/gruntjs/grunt-cli) to compile and start the server:

    $ grunt

    It is worth noting, that on "production" setting default grunt task is running just `grunt compile` not the server itself

  3. Then open a browser and go to:

    http://localhost:8080

    8080 is default port specified in config-dev.json


## Troubleshooting
During install some of you may encounter some issues, most of this issues can be solved by one of the following tips.
If you went through all this and still can't solve the issue, feel free to contact me(Amos), via the repository issue tracker or the links provided below.

#### Update NPM, Bower or Grunt
Sometimes you may find there is a weird error during install like npm's *Error: ENOENT*, usually updating those tools to the latest version solves the issue.

Updating NPM:
```
$ npm update -g npm
```

Updating Grunt:
```
$ npm update -g grunt-cli
```

Updating Bower:
```
$ npm update -g bower
```

#### Cleaning NPM and Bower cache
NPM and Bower has a caching system for holding packages that you already installed.
We found that often cleaning the cache solves some troubles this system creates.

NPM Clean Cache:
```
$ npm cache clean
```

Bower Clean Cache:
```
$ bower cache clean
```


## Configuration
All configuration is specified in the [config](config/) folder, particularly the [config.js](config/config.js) file and the [env](config/env/) files. Here you will need to specify your application name, database name, as well as hook up any social app keys if you want integration with Twitter, Facebook, GitHub or Google.

### Environmental Settings
TODO write up on settings

To run with a different environment, just rewrite "env" in package.json to the enviroment you want.

## Getting Started
* TODO write intro tutorial

## ideal for IntelliJ Webstorm
* TODO write intro tutorial

## More Information
* Contact Jiří Špác on any issue via [E-Mail](mailto:capajj@gmail.com), [Facebook](http://www.facebook.com/capaj), or [Twitter](http://www.twitter.com/capajj).

## Credits
Forked from mean.io project, also inspired by ng-boilerplate.